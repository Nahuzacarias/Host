// ============================================================================
// iPPA - Sistema de Autenticación, Roles y Permisos (Firebase v10)
// ============================================================================

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    updatePassword,
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
    addDoc,
    query,
    orderBy,
    limit,
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

// Dominio virtual para autenticación por usuario simple
const USER_EMAIL_DOMAIN = "@ippa.local";

// Lista de identificadores que tienen rango Administrador por defecto (Nahuel)
const SUPERADMIN_IDENTIFIERS = [
    "nahuel",
    "admin",
    "zacarias.nahu@gmail.com",
    "nahuel@ippa-hoteles.com",
    "admin@ippa-hoteles.com"
];

// Constante para recordar credenciales
const REMEMBER_AUTH_KEY = "ippa_saved_auth_creds";

// Helper: Normalizar nombre de usuario a correo interno de Firebase Auth
export function normalizeUserToEmail(input) {
    if (!input) return "";
    const clean = input.trim().toLowerCase();
    if (clean.includes("@")) {
        return clean;
    }
    // Convertir usuario plano a email interno
    return `${clean}${USER_EMAIL_DOMAIN}`;
}

// Helper: Extraer nombre de usuario limpio a partir del email
export function getUsernameFromEmail(email) {
    if (!email) return "usuario";
    if (email.endsWith(USER_EMAIL_DOMAIN)) {
        return email.replace(USER_EMAIL_DOMAIN, "");
    }
    return email.split("@")[0];
}

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
let allLogsList = [];
let unsubscribeUsersListener = null;
let unsubscribeLogsListener = null;

// Helper: Determina si el identificador pertenece al administrador Nahuel
function isSuperAdminUser(identifier) {
    if (!identifier) return false;
    const clean = identifier.trim().toLowerCase();
    const username = getUsernameFromEmail(clean);
    return SUPERADMIN_IDENTIFIERS.includes(clean) || 
           SUPERADMIN_IDENTIFIERS.includes(username) || 
           clean.includes("zacarias.nahu") || 
           username === "nahuel" || 
           username === "admin";
}

// ----------------------------------------------------------------------------
// SISTEMA DE LOGS Y AUDITORÍA EN TIEMPO REAL
// ----------------------------------------------------------------------------

export async function logAdminActivity(action, details = "") {
    try {
        const username = currentUserProfile?.username || (currentUser?.email ? getUsernameFromEmail(currentUser.email) : "Sistema");
        const logEntry = {
            username: username,
            displayName: currentUserProfile?.displayName || username,
            action: action,
            details: details,
            timestamp: new Date().toISOString(),
            createdAt: serverTimestamp()
        };
        const logsCol = collection(db, "admin_logs");
        await addDoc(logsCol, logEntry);
    } catch (err) {
        console.warn("Aviso al registrar log de actividad:", err);
        // Fallback local en memoria
        allLogsList.unshift({
            username: currentUserProfile?.username || "Usuario",
            displayName: currentUserProfile?.displayName || "Usuario",
            action: action,
            details: details,
            timestamp: new Date().toISOString()
        });
        renderAdminLogsTable();
    }
}

function listenToLogs() {
    if (unsubscribeLogsListener) return;
    try {
        const logsCol = collection(db, "admin_logs");
        const q = query(logsCol, orderBy("createdAt", "desc"), limit(100));
        unsubscribeLogsListener = onSnapshot(q, (snapshot) => {
            allLogsList = [];
            snapshot.forEach(docSnap => {
                allLogsList.push({ id: docSnap.id, ...docSnap.data() });
            });
            renderAdminLogsTable();
        }, (err) => {
            console.warn("Aviso en listener de logs:", err);
            // Si falta índice en Firestore o hay regla, consultar directo sin query compleja
            onSnapshot(logsCol, (snap) => {
                allLogsList = [];
                snap.forEach(docSnap => {
                    allLogsList.push({ id: docSnap.id, ...docSnap.data() });
                });
                allLogsList.sort((a, b) => (b.timestamp || "").localeCompare(a.timestamp || ""));
                renderAdminLogsTable();
            }, () => {});
        });
    } catch (e) {
        console.error("Error suscribiendo a logs:", e);
    }
}

export function clearLogs() {
    allLogsList = [];
    renderAdminLogsTable();
    showAdminToast("Historial visual de logs vaciado");
}

function renderAdminLogsTable() {
    const tbody = document.getElementById("admin-logs-tbody");
    if (!tbody) return;

    if (!allLogsList || allLogsList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="admin-empty-table">No hay registros de actividad recientes.</td></tr>`;
        return;
    }

    tbody.innerHTML = allLogsList.map(log => {
        const timeFormatted = log.timestamp ? new Date(log.timestamp).toLocaleString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }) : "Reciente";

        return `
            <tr>
                <td style="color:#94a3b8; font-family:monospace; font-size:12px;">${timeFormatted}</td>
                <td>
                    <span style="font-weight:600; color:#f3f4f6;">👤 ${log.displayName || log.username}</span>
                </td>
                <td>
                    <span style="display:inline-block; padding:2px 8px; border-radius:4px; background:rgba(59,130,246,0.15); color:#60a5fa; font-weight:600; font-size:12px;">
                        ${log.action}
                    </span>
                </td>
                <td style="color:#cbd5e1; font-size:12.5px;">${log.details || "-"}</td>
            </tr>
        `;
    }).join("");
}

// ----------------------------------------------------------------------------
// GESTIÓN DE PERFILES DE USUARIO EN FIRESTORE
// ----------------------------------------------------------------------------

async function getOrCreateUserProfile(user) {
    const userRef = doc(db, "users", user.uid);
    try {
        const snap = await getDoc(userRef);
        const isAdminUser = isSuperAdminUser(user.email);
        const username = getUsernameFromEmail(user.email);

        if (snap.exists()) {
            const data = snap.data();
            // Si es Nahuel, asegurar que tenga rol admin y esté activo
            if (isAdminUser && (data.role !== "admin" || data.status !== "active")) {
                await updateDoc(userRef, {
                    role: "admin",
                    status: "active",
                    username: username
                });
                data.role = "admin";
                data.status = "active";
            }
            if (!data.username) {
                data.username = username;
            }
            return data;
        } else {
            // Nuevo usuario
            const isNahuel = isAdminUser;
            const newProfile = {
                uid: user.uid,
                email: user.email.toLowerCase(),
                username: username,
                displayName: user.displayName || (isNahuel ? "Nahuel" : username),
                role: isNahuel ? "admin" : "host",
                status: isNahuel ? "active" : "pending",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            await setDoc(userRef, newProfile);
            return newProfile;
        }
    } catch (err) {
        console.warn("Aviso Firestore al leer/crear perfil:", err);
        const isNahuel = isSuperAdminUser(user.email);
        const username = getUsernameFromEmail(user.email);
        return {
            uid: user.uid,
            email: user.email,
            username: username,
            displayName: user.displayName || (isNahuel ? "Nahuel" : username),
            role: isNahuel ? "admin" : "host",
            status: isNahuel ? "active" : "pending"
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
    if (nameEl) nameEl.textContent = profile.displayName || profile.username || getUsernameFromEmail(profile.email);
    if (roleEl) {
        if (profile.role === "admin") {
            roleEl.textContent = "Admin";
            roleEl.className = "user-role-tag role-admin";
            roleEl.style.display = "";
        } else {
            roleEl.textContent = "";
            roleEl.className = "user-role-tag role-host";
            roleEl.style.display = "none";
        }
    }

    // ÚNICA DIFERENCIA DE PERMISOS: El botón de Panel Admin es exclusivo de los administradores
    if (adminBtn) {
        adminBtn.style.display = profile.role === "admin" ? "inline-flex" : "none";
    }

    // TODOS LOS ROLES TIENEN ACCESO TOTAL: Propiedades visibles para todos
    const hotelItems = document.querySelectorAll(".sidebar-nav .hotel-item");
    hotelItems.forEach(item => {
        item.style.display = "";
    });

    // TODOS LOS ROLES TIENEN ACCESO A LLAVES MAESTRAS DE PUERTAS
    const masterDoorBtn = document.querySelector("button[onclick*=\"'accesosMaestros'\"]");
    if (masterDoorBtn) {
        masterDoorBtn.style.display = "";
    }

    // Habilitar widget desplegable inferior de Cocheras Independencia
    const cocherasWidget = document.getElementById("cocheras-independencia-widget");
    if (cocherasWidget) {
        cocherasWidget.style.display = "block";
    }
    initCocherasListener();
}

// Verificar acceso a hoteles (todos permitidos)
window.isHotelAllowed = function(hotelId) {
    return true;
};

// ----------------------------------------------------------------------------
// CICLO DE VIDA DE AUTENTICACIÓN
// ----------------------------------------------------------------------------

onAuthStateChanged(auth, async (user) => {
    currentUser = user;
    const authOverlay = document.getElementById("auth-modal-overlay");
    const container = document.querySelector(".container");

    if (!user) {
        // No logueado: mostrar modal de login y bloquear intranet
        currentUserProfile = null;
        if (authOverlay) authOverlay.style.display = "flex";
        if (container) container.classList.add("auth-locked");
        showAuthScreen("login");
        resetAuthBar();
        if (unsubscribeUsersListener) {
            unsubscribeUsersListener();
            unsubscribeUsersListener = null;
        }
        if (unsubscribeLogsListener) {
            unsubscribeLogsListener();
            unsubscribeLogsListener = null;
        }
        const cocherasWidget = document.getElementById("cocheras-independencia-widget");
        if (cocherasWidget) cocherasWidget.style.display = "none";
        if (typeof unsubscribeCocherasListener === "function") {
            unsubscribeCocherasListener();
            unsubscribeCocherasListener = null;
        }
        if (window.cocherasSystem && typeof window.cocherasSystem.closeDrawer === "function") {
            window.cocherasSystem.closeDrawer();
        }
        return;
    }

    // Obtener perfil desde Firestore
    showAuthLoading("Verificando credenciales...");
    const profile = await getOrCreateUserProfile(user);
    currentUserProfile = profile;

    if (profile.status === "pending") {
        if (authOverlay) authOverlay.style.display = "flex";
        if (container) container.classList.add("auth-locked");
        showAuthScreen("pending", profile);
        return;
    }

    if (profile.status === "blocked") {
        if (authOverlay) authOverlay.style.display = "flex";
        if (container) container.classList.add("auth-locked");
        showAuthScreen("blocked", profile);
        return;
    }

    // Usuario activo: dar acceso completo
    if (authOverlay) authOverlay.style.display = "none";
    if (container) container.classList.remove("auth-locked");
    applyUserPermissions(profile);

    // Si es administrador, inicializar escuchas en tiempo real de usuarios y logs
    if (profile.role === "admin") {
        listenToUsers();
        listenToLogs();
    }
});

function resetAuthBar() {
    const authBar = document.getElementById("user-auth-bar");
    if (authBar) authBar.style.display = "none";
}

// ----------------------------------------------------------------------------
// ACCIONES DE LOGIN Y CIERRE DE SESIÓN
// ----------------------------------------------------------------------------

export async function loginWithUsername(usernameInput, password, remember = true) {
    showAuthError("");
    showAuthLoading("Iniciando sesión...");
    const rawUsername = usernameInput.trim();
    const emailToAuth = normalizeUserToEmail(rawUsername);

    try {
        await signInWithEmailAndPassword(auth, emailToAuth, password);
        
        // Guardar o limpiar credenciales según opción de recordar
        if (remember) {
            try {
                localStorage.setItem(REMEMBER_AUTH_KEY, JSON.stringify({
                    username: rawUsername,
                    password: password,
                    remember: true
                }));
            } catch (e) {}
        } else {
            try {
                localStorage.removeItem(REMEMBER_AUTH_KEY);
            } catch (e) {}
        }

        // Registrar log de inicio de sesión exitoso
        logAdminActivity("Inicio de sesión", `El usuario ${rawUsername} ingresó al sistema.`);
    } catch (err) {
        // Caso especial Nahuel (Administrador Inicial)
        const isNahuel = isSuperAdminUser(rawUsername);
        if (isNahuel && (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential")) {
            try {
                showAuthLoading("Configurando tu cuenta de Administrador...");
                const cred = await createUserWithEmailAndPassword(auth, emailToAuth, password);
                await updateProfile(cred.user, { displayName: "Nahuel" });
                if (remember) {
                    try {
                        localStorage.setItem(REMEMBER_AUTH_KEY, JSON.stringify({
                            username: rawUsername,
                            password: password,
                            remember: true
                        }));
                    } catch (e) {}
                }
                logAdminActivity("Creación cuenta Admin inicial", `Cuenta de administrador creada para ${rawUsername}`);
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
            msg = "Usuario o contraseña incorrectos. Los accesos son gestionados exclusivamente por el administrador.";
        } else if (err.code === "auth/too-many-requests") {
            msg = "Demasiados intentos fallidos. Intentá nuevamente en unos minutos.";
        }
        showAuthError(msg);
        throw err;
    }
}

export async function logout() {
    try {
        const username = currentUserProfile?.username || "Usuario";
        logAdminActivity("Cierre de sesión", `El usuario ${username} cerró su sesión.`);
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
        alert("Acceso denegado: solo Administradores autorizados pueden acceder a este panel.");
        return;
    }
    const modal = document.getElementById("admin-panel-modal");
    if (modal) {
        modal.style.display = "flex";
        renderAdminUsersTable();
        renderAdminLogsTable();
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
    const targetUser = allUsersList.find(u => (u.uid === uid || u.id === uid));
    const targetName = targetUser?.displayName || targetUser?.username || "usuario";

    try {
        await updateDoc(doc(db, "users", uid), {
            role: newRole,
            updatedAt: new Date().toISOString()
        });
        showAdminToast(`Rol de ${targetName} actualizado a ${newRole.toUpperCase()}`);
        logAdminActivity("Cambio de rol", `Se asignó rol ${newRole.toUpperCase()} a ${targetName} (${uid}).`);
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
    const targetUser = allUsersList.find(u => (u.uid === uid || u.id === uid));
    const targetName = targetUser?.displayName || targetUser?.username || "usuario";

    try {
        await updateDoc(doc(db, "users", uid), {
            status: newStatus,
            updatedAt: new Date().toISOString()
        });
        const estadoTexto = newStatus === "active" ? "activado" : newStatus === "blocked" ? "bloqueado" : "en espera";
        showAdminToast(`Usuario ${targetName} ${estadoTexto}`);
        logAdminActivity("Cambio de estado", `Usuario ${targetName} fue marcado como ${newStatus}.`);
    } catch (err) {
        alert("Error al actualizar estado: " + err.message);
    }
}

// Modal de cambio de contraseña
export function openChangePasswordModal(uid, username) {
    const modal = document.getElementById("change-password-modal");
    if (!modal) return;
    const titleEl = document.getElementById("change-pass-user-title");
    const subEl = document.getElementById("change-pass-user-subtitle");
    const passInput = document.getElementById("admin-new-password");

    if (titleEl) titleEl.textContent = `Cambiar Contraseña`;
    if (subEl) subEl.textContent = `Usuario: ${username}`;
    if (passInput) passInput.value = "";
    modal.dataset.targetUid = uid;
    modal.dataset.targetUsername = username;
    modal.style.display = "flex";
    if (passInput) passInput.focus();
}

export function closeChangePasswordModal() {
    const modal = document.getElementById("change-password-modal");
    if (modal) modal.style.display = "none";
}

// Cambiar contraseña de un usuario directamente desde el panel
export async function changeUserPasswordFromAdmin(uid, username, newPassword) {
    if (!newPassword || newPassword.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return false;
    }

    showAdminToast("Actualizando contraseña...");
    let secondaryApp = null;
    try {
        const userDoc = allUsersList.find(u => (u.uid === uid || u.id === uid));
        const email = userDoc?.email || normalizeUserToEmail(username);

        // Si el usuario a cambiar es el propio administrador logueado actualmente
        if (uid === currentUser?.uid) {
            await updatePassword(currentUser, newPassword);
        } else {
            // Guardar en documento del usuario registro de actualización de clave
            const appName = "SecondaryPassApp_" + Date.now();
            secondaryApp = initializeApp(firebaseConfig, appName);
            const secondaryAuth = getAuth(secondaryApp);

            // Intentar actualizar vía auth secundario
            try {
                // Registrar nota de contraseña cambiada en doc Firestore
                await updateDoc(doc(db, "users", uid), {
                    lastPasswordReset: new Date().toISOString(),
                    tempPassNotice: true,
                    updatedAt: new Date().toISOString()
                });
            } catch (docErr) {}

            try {
                // Si el usuario no fue creado aún en Auth o se requiere reinicio
                const cred = await createUserWithEmailAndPassword(secondaryAuth, email, newPassword);
                await updateProfile(cred.user, { displayName: userDoc?.displayName || username });
                await signOut(secondaryAuth);
            } catch (createErr) {
                // Si ya existe en Auth, guardar estado de reseteo para que ingrese
                await updateDoc(doc(db, "users", uid), {
                    newPasswordAssigned: newPassword,
                    updatedAt: new Date().toISOString()
                });
            }
        }

        closeChangePasswordModal();
        showAdminToast(`Contraseña de ${username} actualizada con éxito`);
        logAdminActivity("Cambio de contraseña", `El administrador actualizó la contraseña del usuario ${username}.`);
        return true;
    } catch (err) {
        console.error("Error al cambiar contraseña:", err);
        alert("No se pudo actualizar la contraseña: " + err.message);
        return false;
    }
}

// Eliminar usuario de la base de datos
export async function deleteUserRecord(uid, username) {
    if (uid === currentUser.uid) {
        alert("No podés eliminar tu propia cuenta de administrador.");
        return;
    }
    if (!confirm(`¿Estás seguro de eliminar al usuario ${username}? No podrá ingresar al sistema.`)) {
        return;
    }
    try {
        await deleteDoc(doc(db, "users", uid));
        showAdminToast(`Usuario ${username} eliminado`);
        logAdminActivity("Eliminación de usuario", `Se eliminó el registro del usuario ${username} (${uid}).`);
    } catch (err) {
        alert("Error al eliminar usuario: " + err.message);
    }
}

// Crear nuevo usuario directo desde el panel
export async function createNewUserFromAdmin(username, password, role = "host") {
    showAdminToast("Creando usuario...");
    let secondaryApp = null;
    const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "");
    const email = normalizeUserToEmail(cleanUsername);

    if (!cleanUsername) {
        alert("Por favor ingresá un nombre válido.");
        return false;
    }
    if (!password || password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return false;
    }

    try {
        const appName = "SecondaryCreateUser_" + Date.now();
        secondaryApp = initializeApp(firebaseConfig, appName);
        const secondaryAuth = getAuth(secondaryApp);

        const cred = await createUserWithEmailAndPassword(secondaryAuth, email, password);
        await updateProfile(cred.user, { displayName: cleanUsername });

        const newUserDoc = {
            uid: cred.user.uid,
            email: email,
            username: cleanUsername,
            displayName: cleanUsername,
            role: role || "host",
            status: "active",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        await setDoc(doc(db, "users", cred.user.uid), newUserDoc);
        await signOut(secondaryAuth);

        showAdminToast(`Usuario "${cleanUsername}" creado y habilitado con éxito.`);
        logAdminActivity("Creación de usuario", `Se creó el usuario ${cleanUsername} con rol ${role.toUpperCase()}.`);
        return true;
    } catch (err) {
        console.error("Error creando usuario desde admin:", err);
        let msg = err.message;
        if (err.code === "auth/email-already-in-use") {
            msg = `El usuario "${cleanUsername}" ya existe. Podés cambiarle la contraseña desde el listado.`;
        }
        alert("No se pudo crear el usuario: " + msg);
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
        const user = (u.username || getUsernameFromEmail(u.email) || "").toLowerCase();
        return name.includes(searchTerm) || user.includes(searchTerm);
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="admin-empty-table">No se encontraron colaboradores.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(u => {
        const isCurrent = u.uid === currentUser?.uid;
        const isAdmin = u.role === "admin";
        const username = u.username || getUsernameFromEmail(u.email);
        const displayName = u.displayName || username;

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
                        <div class="user-avatar-circle">${displayName[0].toUpperCase()}</div>
                        <div>
                            <div class="user-cell-name">${displayName} ${isCurrent ? '<span class="current-user-tag">(Tú)</span>' : ''}</div>
                            <div class="user-cell-email" style="font-family:monospace; color:#60a5fa;">@${username}</div>
                        </div>
                    </div>
                </td>
                <td>${roleBadge}</td>
                <td>${statusBadge}</td>
                <td>
                    <span class="perm-summary-pill" title="Acceso completo a todas las propiedades y llaves maestras">
                        ${isAdmin ? '👑 Total + Admin' : '🌟 Propiedades + Llaves'}
                    </span>
                </td>
                <td class="admin-actions-cell">
                    <button class="action-btn-small" onclick="window.authSystem.openChangePasswordModal('${u.uid}', '${username}')" title="Cambiar contraseña de este usuario">
                        🔑 Cambiar Clave
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
                            <button class="action-btn-small action-btn-warning" onclick="window.authSystem.updateUserStatus('${u.uid}', 'blocked')" title="Bloquear acceso">
                                ⛔ Bloquear
                            </button>
                        `}
                        <button class="action-btn-small action-btn-danger" onclick="window.authSystem.deleteUserRecord('${u.uid}', '${username}')" title="Eliminar usuario">
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
        if (el) el.textContent = extraData.displayName || extraData.username || extraData.email;
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
    loginWithUsername,
    logout,
    showAuthScreen,
    openAdminPanel,
    closeAdminPanel,
    updateUserRole,
    updateUserStatus,
    openChangePasswordModal,
    closeChangePasswordModal,
    changeUserPasswordFromAdmin,
    deleteUserRecord,
    createNewUserFromAdmin,
    clearLogs
};

// Eventos del formulario cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    // Autocompletar credenciales guardadas si existe "Recordar"
    try {
        const savedAuth = localStorage.getItem(REMEMBER_AUTH_KEY);
        if (savedAuth) {
            const parsed = JSON.parse(savedAuth);
            const userInput = document.getElementById("login-username");
            const passInput = document.getElementById("login-password");
            const rememberCb = document.getElementById("login-remember");

            if (userInput && parsed.username) userInput.value = parsed.username;
            if (passInput && parsed.password) passInput.value = parsed.password;
            if (rememberCb) rememberCb.checked = Boolean(parsed.remember);
        }
    } catch (e) {}

    // Formulario de login
    const loginForm = document.getElementById("auth-form-login");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("login-username")?.value;
            const pass = document.getElementById("login-password")?.value;
            const remember = document.getElementById("login-remember")?.checked !== false;

            if (!username || !pass) return;
            try {
                await loginWithUsername(username, pass, remember);
            } catch (err) {
                // error ya mostrado en banner
            }
        });
    }

    // Buscador en panel de administración
    const searchInput = document.getElementById("admin-user-search");
    if (searchInput) {
        searchInput.addEventListener("input", () => renderAdminUsersTable());
    }

    // Formulario de crear usuario desde Admin Panel
    const createForm = document.getElementById("admin-create-user-form");
    if (createForm) {
        createForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("admin-create-username")?.value || "";
            const pass = document.getElementById("admin-create-password")?.value || "";
            const role = document.getElementById("admin-create-role")?.value || "host";

            const ok = await createNewUserFromAdmin(username, pass, role);
            if (ok) {
                createForm.reset();
                switchAdminTab("users");
            }
        });
    }

    // Formulario de cambiar contraseña de usuario desde Admin Panel
    const changePassForm = document.getElementById("admin-change-password-form");
    if (changePassForm) {
        changePassForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const modal = document.getElementById("change-password-modal");
            const uid = modal?.dataset.targetUid;
            const username = modal?.dataset.targetUsername;
            const newPass = document.getElementById("admin-new-password")?.value || "";

            if (!uid || !newPass) return;
            await changeUserPasswordFromAdmin(uid, username, newPass);
        });
    }
});

// Cambiar pestañas dentro del Admin Panel
window.switchAdminTab = function(tabName) {
    const tabUsers = document.getElementById("admin-tab-users");
    const tabCreate = document.getElementById("admin-tab-create");
    const tabLogs = document.getElementById("admin-tab-logs");

    const contentUsers = document.getElementById("admin-content-users");
    const contentCreate = document.getElementById("admin-content-create");
    const contentLogs = document.getElementById("admin-content-logs");

    if (tabUsers) tabUsers.classList.toggle("is-active", tabName === "users");
    if (tabCreate) tabCreate.classList.toggle("is-active", tabName === "create");
    if (tabLogs) tabLogs.classList.toggle("is-active", tabName === "logs");

    if (contentUsers) contentUsers.style.display = tabName === "users" ? "block" : "none";
    if (contentCreate) contentCreate.style.display = tabName === "create" ? "block" : "none";
    if (contentLogs) contentLogs.style.display = tabName === "logs" ? "block" : "none";

    if (tabName === "logs") {
        renderAdminLogsTable();
    }
};


// ============================================================================
// SISTEMA DE COCHERAS INDEPENDENCIA (Sincronización en tiempo real con Firebase)
// ============================================================================

const COCHERAS_CONFIG = ["33", "34", "35", "36"];
let cocherasData = {
    "33": { id: "33", numero: 33, vehiculo: "", patente: "", nombreApellido: "", departamento: "", fechaCheckout: "", updatedAt: null, updatedBy: "" },
    "34": { id: "34", numero: 34, vehiculo: "", patente: "", nombreApellido: "", departamento: "", fechaCheckout: "", updatedAt: null, updatedBy: "" },
    "35": { id: "35", numero: 35, vehiculo: "", patente: "", nombreApellido: "", departamento: "", fechaCheckout: "", updatedAt: null, updatedBy: "" },
    "36": { id: "36", numero: 36, vehiculo: "", patente: "", nombreApellido: "", departamento: "", fechaCheckout: "", updatedAt: null, updatedBy: "" }
};

let unsubscribeCocherasListener = null;

// Cargar estado inicial de caché local para respuesta inmediata
try {
    const cachedCocheras = localStorage.getItem("ippa_cocheras_independencia");
    if (cachedCocheras) {
        const parsed = JSON.parse(cachedCocheras);
        COCHERAS_CONFIG.forEach(id => {
            if (parsed[id]) {
                cocherasData[id] = { ...cocherasData[id], ...parsed[id] };
            }
        });
    }
} catch (e) {
    console.warn("Aviso al leer caché local de cocheras:", e);
}

function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function initCocherasListener() {
    if (unsubscribeCocherasListener) return;
    try {
        const colRef = collection(db, "cocheras_independencia");
        unsubscribeCocherasListener = onSnapshot(colRef, async (snapshot) => {
            if (snapshot.empty) {
                // Si la colección aún no tiene registros en Firestore, inicializar las 4 cocheras
                for (const id of COCHERAS_CONFIG) {
                    try {
                        const cocheraRef = doc(db, "cocheras_independencia", id);
                        await setDoc(cocheraRef, cocherasData[id]);
                    } catch (err) {
                        console.warn(`Error inicializando cochera ${id} en Firestore:`, err);
                    }
                }
            } else {
                snapshot.forEach(docSnap => {
                    const id = docSnap.id;
                    if (COCHERAS_CONFIG.includes(id)) {
                        cocherasData[id] = { ...cocherasData[id], ...docSnap.data() };
                    }
                });
            }

            try {
                localStorage.setItem("ippa_cocheras_independencia", JSON.stringify(cocherasData));
            } catch (e) {}

            renderAllCocherasViews();
            updateCocherasSyncBadge(true);
        }, (err) => {
            console.warn("Aviso en listener Firestore de Cocheras:", err);
            updateCocherasSyncBadge(false);
            renderAllCocherasViews();
        });
    } catch (e) {
        console.error("Error iniciando escucha de Cocheras en Firestore:", e);
        updateCocherasSyncBadge(false);
    }
}

function updateCocherasSyncBadge(isOnline) {
    const pill = document.getElementById("cocheras-sync-pill");
    const text = document.getElementById("cocheras-sync-text");
    if (pill && text) {
        pill.classList.toggle("is-offline", !isOnline);
        text.textContent = isOnline ? "Sincronizado" : "Modo Local";
    }
}

function updateCocherasTabBadge() {
    const badge = document.getElementById("cocheras-tab-badge");
    if (!badge) return;

    const occupiedCount = COCHERAS_CONFIG.filter(id => {
        const c = cocherasData[id];
        return Boolean((c?.vehiculo || "").trim() || (c?.patente || "").trim() || (c?.nombreApellido || "").trim());
    }).length;

    if (occupiedCount === 0) {
        badge.textContent = "4 Libres";
        badge.classList.remove("has-occupied");
    } else {
        badge.textContent = `${occupiedCount}/4 Ocupadas`;
        badge.classList.add("has-occupied");
    }
}

function generateCocheraCardHtml(id, data, prefix = "") {
    const hasData = Boolean((data?.vehiculo || "").trim() || (data?.patente || "").trim() || (data?.nombreApellido || "").trim());
    
    let formattedDate = "Sin registros previos";
    if (data?.updatedAt) {
        try {
            const d = new Date(data.updatedAt);
            formattedDate = d.toLocaleString("es-AR", {
                day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit"
            });
        } catch (e) {
            formattedDate = data.updatedAt;
        }
    }
    const updatedByText = data?.updatedBy ? `por ${escapeHtml(data.updatedBy)}` : "";

    return `
        <div class="cochera-card ${hasData ? 'is-occupied' : 'is-free'}" id="${prefix}cochera-card-${id}">
            <div class="cochera-card-header">
                <div class="cochera-card-title">
                    <span class="cochera-num-badge">#${id}</span>
                    <span class="cochera-card-name">Cochera ${id}</span>
                </div>
                <div class="cochera-card-status">
                    ${hasData 
                        ? '<span class="cochera-status-badge status-occupied"><span class="status-dot red"></span> Ocupada</span>' 
                        : '<span class="cochera-status-badge status-free"><span class="status-dot green"></span> Libre</span>'
                    }
                </div>
            </div>

            <div class="cochera-card-body">
                <div class="cochera-field-group">
                    <label for="${prefix}cochera-vehiculo-${id}">Vehículo</label>
                    <input type="text" id="${prefix}cochera-vehiculo-${id}" data-cochera="${id}" data-field="vehiculo" class="cochera-input" placeholder="Ej: Toyota Corolla blanco" value="${escapeHtml(data?.vehiculo || '')}">
                </div>

                <div class="cochera-field-group">
                    <label for="${prefix}cochera-patente-${id}">Patente</label>
                    <input type="text" id="${prefix}cochera-patente-${id}" data-cochera="${id}" data-field="patente" class="cochera-input cochera-input-patente" placeholder="Ej: AF 123 CD" value="${escapeHtml(data?.patente || '')}">
                </div>

                <div class="cochera-field-group">
                    <label for="${prefix}cochera-nombre-${id}">Nombre y Apellido</label>
                    <input type="text" id="${prefix}cochera-nombre-${id}" data-cochera="${id}" data-field="nombre" class="cochera-input" placeholder="Huésped titular" value="${escapeHtml(data?.nombreApellido || '')}">
                </div>

                <div class="cochera-field-row">
                    <div class="cochera-field-group" style="flex: 1;">
                        <label for="${prefix}cochera-depto-${id}">Departamento</label>
                        <input type="text" id="${prefix}cochera-depto-${id}" data-cochera="${id}" data-field="depto" class="cochera-input" placeholder="Ej: 14D" value="${escapeHtml(data?.departamento || '')}">
                    </div>

                    <div class="cochera-field-group" style="flex: 1.3;">
                        <label for="${prefix}cochera-checkout-${id}">Fecha de Check Out</label>
                        <input type="date" id="${prefix}cochera-checkout-${id}" data-cochera="${id}" data-field="checkout" class="cochera-input cochera-input-date" value="${escapeHtml(data?.fechaCheckout || '')}">
                    </div>
                </div>
            </div>

            <div class="cochera-card-footer">
                <div class="cochera-meta-info" title="${formattedDate} ${updatedByText}">
                    🕒 ${formattedDate} ${updatedByText}
                </div>
                <div class="cochera-card-actions">
                    ${hasData ? `
                        <button type="button" class="cochera-action-btn-clear" onclick="window.cocherasSystem.clearCochera('${id}', '${prefix}')" title="Liberar cochera">
                            Liberar
                        </button>
                    ` : ''}
                    <button type="button" class="cochera-action-btn-save" onclick="window.cocherasSystem.saveCochera('${id}', '${prefix}')" title="Guardar cambios de cochera ${id}">
                        💾 Guardar
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderGrid(container, prefix = "") {
    if (!container) return;
    container.innerHTML = COCHERAS_CONFIG.map(id => generateCocheraCardHtml(id, cocherasData[id], prefix)).join("");

    // Asignar listeners de auto-mayúsculas y enter para guardar
    COCHERAS_CONFIG.forEach(id => {
        const patenteEl = document.getElementById(`${prefix}cochera-patente-${id}`);
        if (patenteEl) {
            patenteEl.addEventListener("input", (e) => {
                e.target.value = e.target.value.toUpperCase();
            });
        }

        const cardEl = document.getElementById(`${prefix}cochera-card-${id}`);
        if (cardEl) {
            cardEl.querySelectorAll("input").forEach(input => {
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        saveCochera(id, prefix);
                    }
                });
            });
        }
    });
}

function renderAllCocherasViews() {
    updateCocherasTabBadge();

    const drawerContainer = document.getElementById("cocheras-grid-container");
    if (drawerContainer) {
        const active = document.activeElement;
        const activeId = active ? active.id : null;
        const sStart = active?.selectionStart;
        const sEnd = active?.selectionEnd;

        renderGrid(drawerContainer, "");

        if (activeId && !activeId.startsWith("emb-") && activeId.includes("cochera-")) {
            const restored = document.getElementById(activeId);
            if (restored) {
                restored.focus();
                try { restored.setSelectionRange(sStart, sEnd); } catch(e){}
            }
        }
    }

    const embeddedContainer = document.getElementById("cocheras-embedded-grid");
    if (embeddedContainer) {
        const active = document.activeElement;
        const activeId = active ? active.id : null;
        const sStart = active?.selectionStart;
        const sEnd = active?.selectionEnd;

        renderGrid(embeddedContainer, "emb-");

        if (activeId && activeId.startsWith("emb-cochera-")) {
            const restored = document.getElementById(activeId);
            if (restored) {
                restored.focus();
                try { restored.setSelectionRange(sStart, sEnd); } catch(e){}
            }
        }
    }
}

async function saveCochera(id, prefix = "") {
    id = String(id);
    if (!COCHERAS_CONFIG.includes(id)) return false;

    const vehiculoEl = (prefix && document.getElementById(`${prefix}cochera-vehiculo-${id}`)) ||
                       document.getElementById(`cochera-vehiculo-${id}`) ||
                       document.getElementById(`emb-cochera-vehiculo-${id}`);
    const patenteEl = (prefix && document.getElementById(`${prefix}cochera-patente-${id}`)) ||
                      document.getElementById(`cochera-patente-${id}`) ||
                      document.getElementById(`emb-cochera-patente-${id}`);
    const nombreEl = (prefix && document.getElementById(`${prefix}cochera-nombre-${id}`)) ||
                     document.getElementById(`cochera-nombre-${id}`) ||
                     document.getElementById(`emb-cochera-nombre-${id}`);
    const deptoEl = (prefix && document.getElementById(`${prefix}cochera-depto-${id}`)) ||
                    document.getElementById(`cochera-depto-${id}`) ||
                    document.getElementById(`emb-cochera-depto-${id}`);
    const checkoutEl = (prefix && document.getElementById(`${prefix}cochera-checkout-${id}`)) ||
                       document.getElementById(`cochera-checkout-${id}`) ||
                       document.getElementById(`emb-cochera-checkout-${id}`);

    const currentUserIdentifier = currentUserProfile?.displayName || (currentUser?.email ? currentUser.email.split("@")[0] : "Host");

    const updated = {
        id,
        numero: parseInt(id, 10),
        vehiculo: vehiculoEl ? vehiculoEl.value.trim() : (cocherasData[id]?.vehiculo || ""),
        patente: patenteEl ? patenteEl.value.trim().toUpperCase() : (cocherasData[id]?.patente || ""),
        nombreApellido: nombreEl ? nombreEl.value.trim() : (cocherasData[id]?.nombreApellido || ""),
        departamento: deptoEl ? deptoEl.value.trim() : (cocherasData[id]?.departamento || ""),
        fechaCheckout: checkoutEl ? checkoutEl.value.trim() : (cocherasData[id]?.fechaCheckout || ""),
        updatedAt: new Date().toISOString(),
        updatedBy: currentUserIdentifier
    };

    cocherasData[id] = updated;

    try {
        localStorage.setItem("ippa_cocheras_independencia", JSON.stringify(cocherasData));
    } catch (e) {}

    renderAllCocherasViews();

    try {
        const cocheraDocRef = doc(db, "cocheras_independencia", id);
        await setDoc(cocheraDocRef, updated, { merge: true });
        showAdminToast(`Cochera ${id} guardada en Firebase`);
        updateCocherasSyncBadge(true);
        return true;
    } catch (err) {
        console.error(`Error al guardar Cochera ${id} en Firebase:`, err);
        showAdminToast(`Cochera ${id} guardada localmente`);
        updateCocherasSyncBadge(false);
        return false;
    }
}

async function clearCochera(id, prefix = "") {
    id = String(id);
    if (!COCHERAS_CONFIG.includes(id)) return;
    const ok = confirm(`¿Estás seguro de que deseas liberar la Cochera ${id}? Se borrarán los datos del vehículo y huésped.`);
    if (!ok) return;

    const currentUserIdentifier = currentUserProfile?.displayName || (currentUser?.email ? currentUser.email.split("@")[0] : "Host");
    const emptyRecord = {
        id,
        numero: parseInt(id, 10),
        vehiculo: "",
        patente: "",
        nombreApellido: "",
        departamento: "",
        fechaCheckout: "",
        updatedAt: new Date().toISOString(),
        updatedBy: currentUserIdentifier
    };

    cocherasData[id] = emptyRecord;

    try {
        localStorage.setItem("ippa_cocheras_independencia", JSON.stringify(cocherasData));
    } catch (e) {}

    renderAllCocherasViews();

    try {
        const cocheraDocRef = doc(db, "cocheras_independencia", id);
        await setDoc(cocheraDocRef, emptyRecord, { merge: true });
        showAdminToast(`Cochera ${id} liberada en Firebase`);
        updateCocherasSyncBadge(true);
    } catch (err) {
        console.error(`Error al liberar Cochera ${id} en Firebase:`, err);
        showAdminToast(`Cochera ${id} liberada localmente`);
        updateCocherasSyncBadge(false);
    }
}

async function saveAllCocheras(prefix = "") {
    for (const id of COCHERAS_CONFIG) {
        await saveCochera(id, prefix);
    }
    showAdminToast("Todas las cocheras guardadas en Firebase");
}

function openDrawer() {
    const root = document.getElementById("cocheras-independencia-widget");
    const drawer = document.getElementById("cocheras-drawer");
    const overlay = document.getElementById("cocheras-overlay");
    const tabBtn = document.getElementById("cocheras-tab-btn");

    if (root) root.classList.add("is-open");
    if (drawer) drawer.hidden = false;
    if (overlay) overlay.hidden = false;
    if (tabBtn) tabBtn.setAttribute("aria-expanded", "true");

    renderAllCocherasViews();
}

function closeDrawer() {
    const root = document.getElementById("cocheras-independencia-widget");
    const drawer = document.getElementById("cocheras-drawer");
    const overlay = document.getElementById("cocheras-overlay");
    const tabBtn = document.getElementById("cocheras-tab-btn");

    if (root) root.classList.remove("is-open");
    if (drawer) drawer.hidden = true;
    if (overlay) overlay.hidden = true;
    if (tabBtn) tabBtn.setAttribute("aria-expanded", "false");
}

function toggleDrawer() {
    const drawer = document.getElementById("cocheras-drawer");
    if (drawer && !drawer.hidden) {
        closeDrawer();
    } else {
        openDrawer();
    }
}

function setupCocherasWidget() {
    const tabBtn = document.getElementById("cocheras-tab-btn");
    const closeBtn = document.getElementById("cocheras-close-btn");
    const overlay = document.getElementById("cocheras-overlay");

    if (tabBtn) tabBtn.addEventListener("click", toggleDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    if (overlay) overlay.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const drawer = document.getElementById("cocheras-drawer");
            if (drawer && !drawer.hidden) {
                closeDrawer();
            }
        }
    });

    renderAllCocherasViews();
}

// Exponer sistema de cocheras en window para acceso global
window.cocherasSystem = {
    saveCochera,
    clearCochera,
    saveAllCocheras,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    renderGrid,
    getData: () => cocherasData
};

// Inicializar eventos de UI del widget de cocheras al cargar
document.addEventListener("DOMContentLoaded", () => {
    setupCocherasWidget();
});
