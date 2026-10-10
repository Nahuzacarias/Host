// ============================================================================
// iPPA Hoteles - Sistema de Autenticación, Roles y Permisos (Firebase v10)
// ============================================================================

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    sendPasswordResetEmail,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    deleteDoc, 
    collection, 
    onSnapshot,
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Configuración oficial de Firebase del proyecto
const firebaseConfig = {
    apiKey: "AIzaSyBmJWE8ZDALpSjJPM1IhNaTC40a4qW6x2I",
    authDomain: "hostippa.firebaseapp.com",
    projectId: "hostippa",
    storageBucket: "hostippa.firebasestorage.app",
    messagingSenderId: "366412782241",
    appId: "1:366412782241:web:e92d7e622e66afd384eee0"
};

// Inicializar App Principal
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Lista de emails que tienen rango Administrador por defecto (Nahuel)
const SUPERADMIN_EMAILS = [
    "zacarias.nahu@gmail.com",
    "nahuel@ippa-hoteles.com",
    "admin@ippa-hoteles.com"
];

// Lista de todas las propiedades y secciones gestionables
export const HOTEL_SECTIONS = [
    { id: "generalLinks", name: "Links y Contraseñas General", desc: "Accesos generales de la empresa" },
    { id: "milenia", name: "Milenia by iPPA", desc: "Hotel Milenia" },
    { id: "mileniaVidt", name: "Milenia Vidt by iPPA", desc: "Propiedad Vidt" },
    { id: "filiberto", name: "Filiberto by iPPA", desc: "Hotel Filiberto" },
    { id: "baires", name: "Baires Belgrano by iPPA", desc: "Hotel Baires" },
    { id: "independencia", name: "Independencia by iPPA", desc: "Propiedad Independencia" },
    { id: "hache", name: "Hache Palermo by iPPA", desc: "Hotel Hache" },
    { id: "aldeaAndina", name: "Aldea Andina by iPPA", desc: "Complejo Aldea Andina" },
    { id: "procedimientos", name: "Procedimientos", desc: "Guías operativas y cobros" },
    { id: "checklist", name: "Checklists", desc: "Checklists de turnos Mañana, Tarde y Noche" },
    { id: "reservas", name: "Reservas", desc: "Accesos y herramientas de Reservas" }
];

// Estado global de la sesión
let currentUser = null;
let currentUserProfile = null;
let allUsersList = [];
let unsubscribeUsersListener = null;

// Helper: Determina si el email pertenece al administrador Nahuel
function isSuperAdminEmail(email) {
    if (!email) return false;
    const clean = email.trim().toLowerCase();
    return SUPERADMIN_EMAILS.includes(clean) || clean.includes("zacarias.nahu") || clean.startsWith("nahuel@");
}

// ----------------------------------------------------------------------------
// GESTIÓN DE PERFILES DE USUARIO EN FIRESTORE
// ----------------------------------------------------------------------------

async function getOrCreateUserProfile(user) {
    const userRef = doc(db, "users", user.uid);
    try {
        const snap = await getDoc(userRef);
        const isAdminEmail = isSuperAdminEmail(user.email);

        if (snap.exists()) {
            const data = snap.data();
            // Si es el mail de Nahuel, asegurar que tenga rol admin y esté activo
            if (isAdminEmail && (data.role !== "admin" || data.status !== "active")) {
                await updateDoc(userRef, {
                    role: "admin",
                    status: "active",
                    "permissions.all": true
                });
                data.role = "admin";
                data.status = "active";
                data.permissions = { all: true, hotels: HOTEL_SECTIONS.map(h => h.id), canViewMasterKeys: true };
            }
            return data;
        } else {
            // Nuevo usuario
            const isNahuel = isAdminEmail;
            const newProfile = {
                uid: user.uid,
                email: user.email.toLowerCase(),
                displayName: user.displayName || (isNahuel ? "Nahuel" : user.email.split("@")[0]),
                role: isNahuel ? "admin" : "host",
                status: isNahuel ? "active" : "pending", // Nahuel entra activo, otros quedan pendientes de aprobación
                permissions: {
                    all: isNahuel,
                    hotels: isNahuel ? HOTEL_SECTIONS.map(h => h.id) : [],
                    canViewMasterKeys: isNahuel
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            await setDoc(userRef, newProfile);
            return newProfile;
        }
    } catch (err) {
        console.warn("Aviso Firestore al leer/crear perfil:", err);
        // Fallback local en caso de que Firestore tenga reglas pendientes de despliegue
        const isNahuel = isSuperAdminEmail(user.email);
        return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || (isNahuel ? "Nahuel" : user.email.split("@")[0]),
            role: isNahuel ? "admin" : "host",
            status: isNahuel ? "active" : "pending",
            permissions: { all: isNahuel, hotels: isNahuel ? HOTEL_SECTIONS.map(h => h.id) : [], canViewMasterKeys: isNahuel }
        };
    }
}

// ----------------------------------------------------------------------------
// APLICACIÓN DE PERMISOS EN LA INTERFAZ
// ----------------------------------------------------------------------------

function applyUserPermissions(profile) {
    if (!profile) return;

    // Actualizar datos del usuario en la barra superior
    const authBar = document.getElementById("user-auth-bar");
    const nameEl = document.getElementById("user-display-name");
    const roleEl = document.getElementById("user-role-tag");
    const adminBtn = document.getElementById("admin-panel-btn");

    if (authBar) authBar.style.display = "flex";
    if (nameEl) nameEl.textContent = profile.displayName || profile.email.split("@")[0];
    if (roleEl) {
        if (profile.role === "admin") {
            roleEl.textContent = "Admin";
            roleEl.className = "user-role-tag role-admin";
        } else {
            roleEl.textContent = "Host";
            roleEl.className = "user-role-tag role-host";
        }
    }

    // Mostrar botón de Admin Panel solo si es Administrador
    if (adminBtn) {
        adminBtn.style.display = profile.role === "admin" ? "inline-flex" : "none";
    }

    const isFullAdmin = profile.role === "admin" || profile.permissions?.all === true;
    const allowedHotels = profile.permissions?.hotels || [];
    const canViewMasterKeys = isFullAdmin || profile.permissions?.canViewMasterKeys === true;

    // Filtrar los elementos del menú lateral (sidebar)
    const hotelItems = document.querySelectorAll(".sidebar-nav .hotel-item");
    hotelItems.forEach(item => {
        const btn = item.querySelector(".hotel-button");
        if (!btn) return;
        const onclickAttr = btn.getAttribute("onclick") || "";
        const match = onclickAttr.match(/toggleHotel\(['"]([^'"]+)['"]\)/);
        if (!match) return;
        const hotelId = match[1];

        if (isFullAdmin || allowedHotels.includes(hotelId)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });

    // Controlar botón de Accesos Maestros de Puertas en generalLinks
    const masterDoorBtn = document.querySelector("button[onclick*=\"'accesosMaestros'\"]");
    if (masterDoorBtn) {
        masterDoorBtn.style.display = canViewMasterKeys ? "" : "none";
    }
}

// Interceptar o proteger cambio de sección para usuarios no autorizados
window.isHotelAllowed = function(hotelId) {
    if (!currentUserProfile) return false;
    if (currentUserProfile.role === "admin" || currentUserProfile.permissions?.all) return true;
    return (currentUserProfile.permissions?.hotels || []).includes(hotelId);
};

// ----------------------------------------------------------------------------
// CICLO DE VIDA DE AUTENTICACIÓN
// ----------------------------------------------------------------------------

onAuthStateChanged(auth, async (user) => {
    currentUser = user;
    const authOverlay = document.getElementById("auth-modal-overlay");
    const container = document.querySelector(".container");

    if (!user) {
        // No logueado: mostrar modal de login y ocultar interfaz
        currentUserProfile = null;
        if (authOverlay) authOverlay.style.display = "flex";
        if (container) container.classList.add("auth-locked");
        showAuthScreen("login");
        resetAuthBar();
        if (unsubscribeUsersListener) {
            unsubscribeUsersListener();
            unsubscribeUsersListener = null;
        }
        return;
    }

    // Obtener perfil desde Firestore
    showAuthLoading("Verificando credenciales y permisos...");
    const profile = await getOrCreateUserProfile(user);
    currentUserProfile = profile;

    if (profile.status === "pending") {
        // Cuenta pendiente de aprobación
        if (authOverlay) authOverlay.style.display = "flex";
        if (container) container.classList.add("auth-locked");
        showAuthScreen("pending", profile);
        return;
    }

    if (profile.status === "blocked") {
        // Cuenta bloqueada
        if (authOverlay) authOverlay.style.display = "flex";
        if (container) container.classList.add("auth-locked");
        showAuthScreen("blocked", profile);
        return;
    }

    // Usuario activo: dar acceso completo a la intranet
    if (authOverlay) authOverlay.style.display = "none";
    if (container) container.classList.remove("auth-locked");
    applyUserPermissions(profile);

    // Si es administrador, inicializar escucha en tiempo real de usuarios
    if (profile.role === "admin") {
        listenToUsers();
    }
});

function resetAuthBar() {
    const authBar = document.getElementById("user-auth-bar");
    if (authBar) authBar.style.display = "none";
}

// ----------------------------------------------------------------------------
// ACCIONES DE LOGIN, REGISTRO Y RECUPERACIÓN
// ----------------------------------------------------------------------------

export async function loginWithEmail(email, password) {
    showAuthError("");
    showAuthLoading("Iniciando sesión...");
    const cleanEmail = email.trim().toLowerCase();

    try {
        await signInWithEmailAndPassword(auth, cleanEmail, password);
    } catch (err) {
        // Si es el correo de Nahuel (Administrador) y aún no fue creado en Firebase Auth:
        const isNahuel = isSuperAdminEmail(cleanEmail);
        if (isNahuel && (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential")) {
            try {
                showAuthLoading("Configurando tu cuenta de Administrador...");
                const cred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
                await updateProfile(cred.user, { displayName: "Nahuel" });
                return;
            } catch (createErr) {
                if (createErr.code === "auth/email-already-in-use") {
                    hideAuthLoading();
                    showAuthError("Contraseña incorrecta para tu cuenta de Administrador.");
                    return;
                }
            }
        }

        hideAuthLoading();
        let msg = "Error al iniciar sesión.";
        if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
            msg = "Correo o contraseña incorrectos. Los accesos son gestionados exclusivamente por el administrador.";
        } else if (err.code === "auth/invalid-email") {
            msg = "El formato de correo no es válido.";
        } else if (err.code === "auth/too-many-requests") {
            msg = "Demasiados intentos fallidos. Intentá nuevamente en unos minutos.";
        }
        showAuthError(msg);
        throw err;
    }
}

export async function registerWithEmail(name, email, password) {
    showAuthError("");
    showAuthLoading("Creando tu cuenta...");
    try {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        if (name.trim()) {
            await updateProfile(cred.user, { displayName: name.trim() });
        }
    } catch (err) {
        hideAuthLoading();
        let msg = "Error al registrarse.";
        if (err.code === "auth/email-already-in-use") {
            msg = "Ya existe una cuenta con este correo electrónico.";
        } else if (err.code === "auth/weak-password") {
            msg = "La contraseña debe tener al menos 6 caracteres.";
        } else if (err.code === "auth/invalid-email") {
            msg = "El correo electrónico no es válido.";
        }
        showAuthError(msg);
        throw err;
    }
}

export async function resetPassword(email) {
    showAuthError("");
    showAuthLoading("Enviando correo de recuperación...");
    try {
        await sendPasswordResetEmail(auth, email.trim());
        hideAuthLoading();
        showAuthSuccess("Te enviamos un enlace de recuperación a tu correo.");
    } catch (err) {
        hideAuthLoading();
        let msg = "No se pudo enviar el correo de recuperación.";
        if (err.code === "auth/user-not-found") {
            msg = "No se encontró ninguna cuenta con ese correo.";
        }
        showAuthError(msg);
        throw err;
    }
}

export async function logout() {
    try {
        await signOut(auth);
    } catch (err) {
        console.error("Error al cerrar sesión:", err);
    }
}

// ----------------------------------------------------------------------------
// PANEL DE ADMINISTRACIÓN (SOLO NAHUEL / ADMINS)
// ----------------------------------------------------------------------------

function listenToUsers() {
    if (unsubscribeUsersListener) return;
    try {
        const usersCol = collection(db, "users");
        unsubscribeUsersListener = onSnapshot(usersCol, (snapshot) => {
            allUsersList = [];
            snapshot.forEach(docSnap => {
                allUsersList.push({ id: docSnap.id, ...docSnap.data() });
            });
            renderAdminUsersTable();
            updateAdminStats();
        }, (err) => {
            console.warn("Aviso en listener de usuarios:", err);
        });
    } catch (e) {
        console.error("Error suscribiendo a usuarios:", e);
    }
}

export function openAdminPanel() {
    if (!currentUserProfile || currentUserProfile.role !== "admin") {
        alert("Acceso denegado: solo Nahuel y administradores autorizados pueden acceder a este panel.");
        return;
    }
    const modal = document.getElementById("admin-panel-modal");
    if (modal) {
        modal.style.display = "flex";
        renderAdminUsersTable();
        updateAdminStats();
    }
}

export function closeAdminPanel() {
    const modal = document.getElementById("admin-panel-modal");
    if (modal) modal.style.display = "none";
}

// Cambiar rol de usuario (Admin <-> Host)
export async function updateUserRole(uid, newRole) {
    if (uid === currentUser.uid && newRole !== "admin") {
        alert("No podés quitarte tus propios privilegios de Administrador.");
        return;
    }
    try {
        await updateDoc(doc(db, "users", uid), {
            role: newRole,
            updatedAt: new Date().toISOString()
        });
        showAdminToast(`Rol actualizado a ${newRole.toUpperCase()}`);
    } catch (err) {
        alert("Error al actualizar rol: " + err.message);
    }
}

// Cambiar estado de usuario (Activo, Pendiente, Bloqueado)
export async function updateUserStatus(uid, newStatus) {
    if (uid === currentUser.uid && newStatus === "blocked") {
        alert("No podés bloquear tu propia cuenta.");
        return;
    }
    try {
        await updateDoc(doc(db, "users", uid), {
            status: newStatus,
            updatedAt: new Date().toISOString()
        });
        showAdminToast(`Usuario ${newStatus === "active" ? "activado" : newStatus === "blocked" ? "bloqueado" : "en espera"}`);
    } catch (err) {
        alert("Error al actualizar estado: " + err.message);
    }
}

// Abrir modal de edición de permisos específicos
export function openEditPermissionsModal(uid) {
    const user = allUsersList.find(u => u.uid === uid || u.id === uid);
    if (!user) return;

    const modal = document.getElementById("permissions-modal");
    if (!modal) return;

    document.getElementById("perm-user-name").textContent = user.displayName || user.email;
    document.getElementById("perm-user-email").textContent = user.email;
    modal.dataset.targetUid = uid;

    const isAll = user.permissions?.all === true;
    const allCheckbox = document.getElementById("perm-all-hotels");
    if (allCheckbox) allCheckbox.checked = isAll;

    const masterKeysCheckbox = document.getElementById("perm-master-keys");
    if (masterKeysCheckbox) masterKeysCheckbox.checked = isAll || user.permissions?.canViewMasterKeys === true;

    const userHotels = user.permissions?.hotels || [];
    const container = document.getElementById("perm-hotels-list");
    if (container) {
        container.innerHTML = HOTEL_SECTIONS.map(hotel => `
            <label class="hotel-perm-item ${isAll ? 'is-disabled' : ''}">
                <input type="checkbox" name="hotel-perm" value="${hotel.id}" 
                    ${isAll || userHotels.includes(hotel.id) ? 'checked' : ''} 
                    ${isAll ? 'disabled' : ''}>
                <div class="hotel-perm-info">
                    <span class="hotel-perm-title">${hotel.name}</span>
                    <span class="hotel-perm-desc">${hotel.desc}</span>
                </div>
            </label>
        `).join("");
    }

    modal.style.display = "flex";
}

export function closeEditPermissionsModal() {
    const modal = document.getElementById("permissions-modal");
    if (modal) modal.style.display = "none";
}

export async function saveUserPermissions() {
    const modal = document.getElementById("permissions-modal");
    if (!modal) return;
    const uid = modal.dataset.targetUid;
    if (!uid) return;

    const isAll = document.getElementById("perm-all-hotels")?.checked || false;
    const canViewMasterKeys = document.getElementById("perm-master-keys")?.checked || false;

    let selectedHotels = [];
    if (!isAll) {
        const checkboxes = document.querySelectorAll("#perm-hotels-list input[type='checkbox']:checked");
        checkboxes.forEach(cb => selectedHotels.push(cb.value));
    } else {
        selectedHotels = HOTEL_SECTIONS.map(h => h.id);
    }

    try {
        await updateDoc(doc(db, "users", uid), {
            permissions: {
                all: isAll,
                hotels: selectedHotels,
                canViewMasterKeys: isAll || canViewMasterKeys
            },
            updatedAt: new Date().toISOString()
        });

        closeEditPermissionsModal();
        showAdminToast("Permisos guardados correctamente");
    } catch (err) {
        alert("Error al guardar permisos: " + err.message);
    }
}

// Eliminar usuario de la base de datos
export async function deleteUserRecord(uid, email) {
    if (uid === currentUser.uid) {
        alert("No podés eliminar tu propia cuenta de administrador.");
        return;
    }
    if (!confirm(`¿Estás seguro de eliminar el perfil de ${email}? El usuario no podrá acceder al sistema.`)) {
        return;
    }
    try {
        await deleteDoc(doc(db, "users", uid));
        showAdminToast("Perfil de usuario eliminado");
    } catch (err) {
        alert("Error al eliminar usuario: " + err.message);
    }
}

// Crear nuevo usuario directo desde el panel (mediante segunda app de Firebase para no desconectar a Nahuel)
export async function createNewUserFromAdmin(name, email, password, role, isAll, selectedHotels, canMasterKeys) {
    showAdminToast("Creando usuario...");
    let secondaryApp = null;
    try {
        // Inicializar app secundaria temporal
        const appName = "SecondaryCreateUser_" + Date.now();
        secondaryApp = initializeApp(firebaseConfig, appName);
        const secondaryAuth = getAuth(secondaryApp);

        const cred = await createUserWithEmailAndPassword(secondaryAuth, email.trim(), password);
        if (name.trim()) {
            await updateProfile(cred.user, { displayName: name.trim() });
        }

        const newUserDoc = {
            uid: cred.user.uid,
            email: email.trim().toLowerCase(),
            displayName: name.trim() || email.split("@")[0],
            role: role || "host",
            status: "active",
            permissions: {
                all: isAll,
                hotels: isAll ? HOTEL_SECTIONS.map(h => h.id) : selectedHotels,
                canViewMasterKeys: isAll || canMasterKeys
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        await setDoc(doc(db, "users", cred.user.uid), newUserDoc);
        await signOut(secondaryAuth);

        showAdminToast(`Usuario ${email} creado y habilitado con éxito.`);
        return true;
    } catch (err) {
        console.error("Error creando usuario desde admin:", err);
        alert("No se pudo crear el usuario: " + err.message);
        return false;
    }
}

// ----------------------------------------------------------------------------
// RENDERIZADO DEL PANEL DE ADMINISTRACIÓN
// ----------------------------------------------------------------------------

function updateAdminStats() {
    const totalEl = document.getElementById("admin-stat-total");
    const activeEl = document.getElementById("admin-stat-active");
    const pendingEl = document.getElementById("admin-stat-pending");
    const adminsEl = document.getElementById("admin-stat-admins");

    if (!totalEl) return;
    const total = allUsersList.length;
    const active = allUsersList.filter(u => u.status === "active").length;
    const pending = allUsersList.filter(u => u.status === "pending").length;
    const admins = allUsersList.filter(u => u.role === "admin").length;

    totalEl.textContent = total;
    activeEl.textContent = active;
    pendingEl.textContent = pending;
    adminsEl.textContent = admins;

    // Resaltar indicador de pendientes si los hay
    const pendingBadge = document.getElementById("admin-pending-counter-badge");
    if (pendingBadge) {
        if (pending > 0) {
            pendingBadge.textContent = pending;
            pendingBadge.style.display = "inline-flex";
        } else {
            pendingBadge.style.display = "none";
        }
    }
}

function renderAdminUsersTable() {
    const tbody = document.getElementById("admin-users-tbody");
    if (!tbody) return;

    const searchTerm = (document.getElementById("admin-user-search")?.value || "").toLowerCase().trim();
    const filtered = allUsersList.filter(u => {
        if (!searchTerm) return true;
        const name = (u.displayName || "").toLowerCase();
        const mail = (u.email || "").toLowerCase();
        return name.includes(searchTerm) || mail.includes(searchTerm);
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="admin-empty-table">No se encontraron usuarios.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(u => {
        const isCurrent = u.uid === currentUser?.uid;
        const isAdmin = u.role === "admin";
        const isAll = u.permissions?.all === true;
        const hotelCount = isAll ? "Todos" : (u.permissions?.hotels?.length || 0);

        let statusBadge = "";
        if (u.status === "active") {
            statusBadge = `<span class="status-pill status-active">Activo</span>`;
        } else if (u.status === "pending") {
            statusBadge = `<span class="status-pill status-pending">Pendiente</span>`;
        } else {
            statusBadge = `<span class="status-pill status-blocked">Bloqueado</span>`;
        }

        const roleBadge = isAdmin 
            ? `<span class="role-pill role-admin">👑 Admin</span>`
            : `<span class="role-pill role-host">Host</span>`;

        return `
            <tr>
                <td>
                    <div class="user-cell">
                        <div class="user-avatar-circle">${(u.displayName || u.email)[0].toUpperCase()}</div>
                        <div>
                            <div class="user-cell-name">${u.displayName || u.email.split("@")[0]} ${isCurrent ? '<span class="current-user-tag">(Tú)</span>' : ''}</div>
                            <div class="user-cell-email">${u.email}</div>
                        </div>
                    </div>
                </td>
                <td>${roleBadge}</td>
                <td>${statusBadge}</td>
                <td>
                    <span class="perm-summary-pill" title="${isAll ? 'Acceso a todas las propiedades' : (u.permissions?.hotels || []).join(', ')}">
                        ${isAll ? '🌟 Acceso Total' : `🏢 ${hotelCount} propiedades`}
                    </span>
                </td>
                <td class="admin-actions-cell">
                    <button class="action-btn-small" onclick="window.authSystem.openEditPermissionsModal('${u.uid}')" title="Configurar permisos por hotel">
                        🔑 Permisos
                    </button>
                    ${!isCurrent ? `
                        <button class="action-btn-small" onclick="window.authSystem.updateUserRole('${u.uid}', '${isAdmin ? 'host' : 'admin'}')" title="Cambiar rol">
                            ${isAdmin ? 'Hacer Host' : 'Hacer Admin'}
                        </button>
                        ${u.status !== 'active' ? `
                            <button class="action-btn-small action-btn-success" onclick="window.authSystem.updateUserStatus('${u.uid}', 'active')" title="Aprobar y activar acceso">
                                ✅ Activar
                            </button>
                        ` : `
                            <button class="action-btn-small action-btn-warning" onclick="window.authSystem.updateUserStatus('${u.uid}', 'blocked')" title="Bloquear acceso temporalmente">
                                ⛔ Bloquear
                            </button>
                        `}
                        <button class="action-btn-small action-btn-danger" onclick="window.authSystem.deleteUserRecord('${u.uid}', '${u.email}')" title="Eliminar registro">
                            🗑️
                        </button>
                    ` : ''}
                </td>
            </tr>
        `;
    }).join("");
}

function showAdminToast(msg) {
    const toast = document.getElementById("admin-toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");
    setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

// ----------------------------------------------------------------------------
// INTERFAZ DE AUTENTICACIÓN (PANTALLAS MODAL)
// ----------------------------------------------------------------------------

function showAuthScreen(screenName, extraData = null) {
    const loginCard = document.getElementById("auth-card-login");
    const pendingCard = document.getElementById("auth-card-pending");
    const blockedCard = document.getElementById("auth-card-blocked");

    if (loginCard) loginCard.style.display = screenName === "login" ? "block" : "none";
    if (pendingCard) pendingCard.style.display = screenName === "pending" ? "block" : "none";
    if (blockedCard) blockedCard.style.display = screenName === "blocked" ? "block" : "none";

    showAuthError("");

    if (screenName === "pending" && extraData) {
        const el = document.getElementById("pending-user-name");
        if (el) el.textContent = extraData.displayName || extraData.email;
    }
}

function showAuthError(msg) {
    const errBox = document.getElementById("auth-error-banner");
    if (!errBox) return;
    if (msg) {
        errBox.textContent = msg;
        errBox.style.display = "block";
    } else {
        errBox.textContent = "";
        errBox.style.display = "none";
    }
}

function showAuthSuccess(msg) {
    const succBox = document.getElementById("auth-success-banner");
    if (!succBox) return;
    if (msg) {
        succBox.textContent = msg;
        succBox.style.display = "block";
    } else {
        succBox.textContent = "";
        succBox.style.display = "none";
    }
}

function showAuthLoading(msg) {
    const loadingEl = document.getElementById("auth-loading-spinner");
    const loadingText = document.getElementById("auth-loading-text");
    if (loadingEl) loadingEl.style.display = "flex";
    if (loadingText) loadingText.textContent = msg || "Cargando...";
}

function hideAuthLoading() {
    const loadingEl = document.getElementById("auth-loading-spinner");
    if (loadingEl) loadingEl.style.display = "none";
}

// ----------------------------------------------------------------------------
// EXPORTAR AL OBJETO GLOBAL WINDOW
// ----------------------------------------------------------------------------

window.authSystem = {
    loginWithEmail,
    registerWithEmail,
    resetPassword,
    logout,
    showAuthScreen,
    openAdminPanel,
    closeAdminPanel,
    updateUserRole,
    updateUserStatus,
    openEditPermissionsModal,
    closeEditPermissionsModal,
    saveUserPermissions,
    deleteUserRecord,
    createNewUserFromAdmin
};

// Eventos del formulario cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    // Formulario de login
    const loginForm = document.getElementById("auth-form-login");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("login-email")?.value;
            const pass = document.getElementById("login-password")?.value;
            if (!email || !pass) return;
            try {
                await loginWithEmail(email, pass);
            } catch (err) {
                // error ya mostrado
            }
        });
    }

    // Buscador en panel de administración
    const searchInput = document.getElementById("admin-user-search");
    if (searchInput) {
        searchInput.addEventListener("input", () => renderAdminUsersTable());
    }

    // Checkbox "Acceso Total" en modal de permisos
    const allHotelsCb = document.getElementById("perm-all-hotels");
    if (allHotelsCb) {
        allHotelsCb.addEventListener("change", (e) => {
            const isChecked = e.target.checked;
            const items = document.querySelectorAll("#perm-hotels-list input[type='checkbox']");
            items.forEach(item => {
                item.disabled = isChecked;
                if (isChecked) item.checked = true;
            });
            const labels = document.querySelectorAll("#perm-hotels-list .hotel-perm-item");
            labels.forEach(l => l.classList.toggle("is-disabled", isChecked));
        });
    }

    // Formulario de crear usuario desde Admin Panel
    const createForm = document.getElementById("admin-create-user-form");
    if (createForm) {
        createForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("admin-create-name")?.value || "";
            const email = document.getElementById("admin-create-email")?.value || "";
            const pass = document.getElementById("admin-create-password")?.value || "";
            const role = document.getElementById("admin-create-role")?.value || "host";
            const isAll = document.getElementById("admin-create-all-hotels")?.checked || false;
            const masterKeys = document.getElementById("admin-create-master-keys")?.checked || false;

            const selected = [];
            if (!isAll) {
                document.querySelectorAll("#admin-create-hotels-list input[type='checkbox']:checked").forEach(cb => {
                    selected.push(cb.value);
                });
            }

            const ok = await createNewUserFromAdmin(name, email, pass, role, isAll, selected, masterKeys);
            if (ok) {
                createForm.reset();
                // Cambiar a pestaña de lista de usuarios
                switchAdminTab("users");
            }
        });
    }
});

// Cambiar pestañas dentro del Admin Panel
window.switchAdminTab = function(tabName) {
    const tabUsers = document.getElementById("admin-tab-users");
    const tabCreate = document.getElementById("admin-tab-create");
    const contentUsers = document.getElementById("admin-content-users");
    const contentCreate = document.getElementById("admin-content-create");

    if (tabUsers && tabCreate) {
        tabUsers.classList.toggle("is-active", tabName === "users");
        tabCreate.classList.toggle("is-active", tabName === "create");
    }
    if (contentUsers && contentCreate) {
        contentUsers.style.display = tabName === "users" ? "block" : "none";
        contentCreate.style.display = tabName === "create" ? "block" : "none";
    }

    if (tabName === "create") {
        renderCreateUserHotelsList();
    }
};

function renderCreateUserHotelsList() {
    const listEl = document.getElementById("admin-create-hotels-list");
    if (!listEl || listEl.children.length > 0) return;
    listEl.innerHTML = HOTEL_SECTIONS.map(h => `
        <label class="hotel-perm-item">
            <input type="checkbox" name="admin-create-hotel" value="${h.id}" checked>
            <div class="hotel-perm-info">
                <span class="hotel-perm-title">${h.name}</span>
                <span class="hotel-perm-desc">${h.desc}</span>
            </div>
        </label>
    `).join("");
}
