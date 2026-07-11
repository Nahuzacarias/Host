// --- LÓGICA RESPONSIVE NUEVA ---
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            sidebar.classList.toggle('active');
            const isOpen = sidebar.classList.contains('active');
            overlay.style.display = isOpen ? 'block' : 'none';
            document.body.classList.toggle('sidebar-open', isOpen);
        }

        function closeSidebarOnMobile() {
            if (window.innerWidth <= 900) {
                const sidebar = document.getElementById('sidebar');
                if (sidebar.classList.contains('active')) {
                    toggleSidebar();
                }
            }
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                const sidebar = document.getElementById('sidebar');
                const overlay = document.getElementById('overlay');
                if (sidebar) sidebar.classList.remove('active');
                if (overlay) overlay.style.display = 'none';
                document.body.classList.remove('sidebar-open');
            }
        });

        // --- TU CÓDIGO ORIGINAL (Sin cambios en los datos) ---
        const hotelsData = {
            generalLinks: {
                name: 'Links y contraseñas general',
                subsections: {
                    links: {
                        title: 'Links y contraseñas general',
                        sections: [
                            {
                                name: 'Accesos comunes',
                                data: [
                                    ['Nombre', 'Link', 'Usuario', 'Contraseña'],
                                    ['Web iPPA', '<a href="https://ippa-hoteles.com/" target="_blank">Reservar en iPPA hoteles</a>', '-', '-'],
                                    ['Mail Host', '-', 'host@ippa-hoteles.com', 'IPHoteles2025!'],
                                    ['Clover Rudi', '<a href="https://www5.ipg-online.com/vt/login" target="_blank">Clover Rudi</a>', '5930714481424', 'iPPAHoteles2026!'],
                                    ['TTlock', '<a href="https://lock2.ttlock.com/" target="_blank">TTlock Web</a>', 'asistente.operaciones@ippa-hoteles.com', 'IPHoteles2030!!'],
                                    ['Trello', '<a href="https://id.atlassian.com/login?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback%3Fdisplay%3DeyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%253D%253D&display=eyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%3D%3D" target="_blank">Login Trello</a>', 'host.filiberto@ippa-hoteles.com', 'IPHoteles2024'],
                                    ['Roomcloud Host', '<a href="https://secure.roomcloud.net/be/owners_area/index.jsp" target="_blank">Login RoomCloud</a>', 'Host iPPA', 'IPHoteles2027!'],
                                    ['BookiP', '<a href="https://prd-iph.opti-hospitalitysuite.com/auth/login/login.php" target="_blank">Login BookiP</a>', 'hostippa', 'IPHoteles2024'],
                                    ['Booking', '<a href="https://account.booking.com/sign-in?op_token=EgVvYXV0aCJHChQ2Wjcyb0hPZDM2Tm43emszcGlyaBIJYXV0aG9yaXplGhpodHRwczovL2FkbWluLmJvb2tpbmcuY29tLyoCe31CBGNvZGUqEjCb87nq2-8mOgBCAFjOvJevBg" target="_blank">Login Booking</a>', 'ippahost', 'IPHoteles2025!!'],
                                    ['Expedia', '<a href="https://www.expediapartnercentral.com/Account/Logon?signedOff=true" target="_blank">Login Expedia</a>', 'host@ippa-hoteles.com', 'IPHoteles2025!!'],
                                    ['Airbnb', '-', 'reservas@ippa-hoteles.com', 'IPHoteles2024']
                                ]
                            },
                            {
                                name: 'Usuarios personales',
                                data: [
                                    ['Nombre', 'Link', 'Usuario', 'Contraseña'],
                                    ['Edy Prieto', '-', 'ippahosttm@gmail.com', '-'],
                                    ['Julian Carrizo', '-', 'ippahosttt@gmail.com', '-'],
                                    ['Sebastian recchimuzzi', '-', 'ippahostt@gmail.com', '-'],
                                    ['Emmanuel Medina', '-', 'emmanuel.medina@ip-hoteles.com', '-'],
                                    ['Nahuel Zacarias', '-', 'asistente.operaciones@ippa-hoteles.com', '-'],
                                    ['ippahostTN', '-', 'ippahostTN', 'IPHoteles2030!!'],
                                ]
                            }
                        ]
                    }
                }
            },
            baires: {
                name: 'Baires by iPPA',
                subsections: {
                    
                    links: {
                        title: 'Links y contraseñas',
                        sections: [
                            {
                                name: 'Información General',
                                data: [
                                    ['Nombre', 'Link', 'Usuario', 'Contraseña'],
                                    ['Mail Baires ','-', 'host.baires@ippa-hoteles.com', 'IPHoteles2025!'],
                                    ['Trello', '<a href="https://id.atlassian.com/login?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback%3Fdisplay%3DeyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%253D%253D&display=eyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%3D%3D" target="_blank">Login Trello</a>', 'host.filiberto@ippa-hoteles.com', 'IPHoteles2024'],
                                    ['Roomcloud Host', '<a href="https://secure.roomcloud.net/be/owners_area/index.jsp" target="_blank">Login RoomCloud</a>', 'HostiPPA', 'IPHoteles2026!'],
                                ]
                            },
                            {
                                name: "OTA's",
                                data: [
                                    ['Nombre', 'Link', 'Usuario', 'Contraseña'],
                                    ['Despegar', '<a href="https://extranet.despegar.com/extranet-hotels/bkd/hotels/dashboard/6057403" target="_blank">Login Despegar</a>', 'Dana-Croatto', 'Host2026!'],
                                ]
                            }
                        ]
                    },
                    bedding: {
                        title: 'Categoría y Bedding',
                        sections: [
                            {
                                name: 'Configuración de Habitaciones',
                                data: [
                                    ['Equipamiento y Bedding', '-', '-', 'Número'],
                                    ['HABS QUE SE HACEN TWIN', '-', '-', 'NINGUNA'],
                                    ['HABS CON SOFÁ CAMA', '-', '-', 'TODAS'],
                                ]
                            }
                        ]
                    },
                    desayunos: {
                        title: 'Desayunos',
                        sections: [
                            {
                                name: 'Convenio de desayunos con panadería “La Argentina”',
                                data: [
                                    ['Detalle', 'Información'],
                                    ['Procedimiento', 'Avisar a la panadería con los datos del huésped el mismo día de los desayunos temprano.'],
                                    ['Horarios', 'La panadería abre a las 7:30. No hay horario específico de cierre de desayuno.'],
                                    ['Opciones', 'También pueden pedir el desayuno para llevar.']
                                ]
                            },
                            {
                                name: 'Menú de Desayuno',
                                data: [
                                    ['Base', 'Café con leche + Vasito de jugo'],
                                    ['1ra opción', 'Tostada con palta y cherry'],
                                    ['2da opción', 'Chipá con jamón y queso'],
                                    ['3ra opción', 'Árabe con jamón y queso'],
                                    ['Nota', 'Si no desea ninguna: CCL + 2 Medialunas + Vasito de jugo']
                                ]
                            }
                        ]
                    },
                    bankData: {
                        title: 'Datos Bancarios',
                        sections: [
                            {
                                name: 'Información de Cuenta',
                                data: [
                                    ['Concepto', 'Detalle'],
                                    ['Razón Social', 'RUDI SA'],
                                    ['Cuit', '30-71448142-4'],
                                    ['CBU', '0070677920000000724717'],
                                    ['Banco', 'Galicia']
                                ]
                            }
                        ]
                    }
                }
            },
            hache: {
                name: 'Hache Palermo by iPPA',
                subsections: {
                    links: {
                        title: 'Links y contraseñas',
                        sections: [
                            {
                                name: 'Información General',
                                data: [
                                    ['Nombre', 'Link', 'Usuario', 'Contraseña'],
                                    ['Mail', '-', 'host.hachepalermo@ippa-hoteles.com', 'Hoteler1a96#'],
                                    ['Hit Connect', '-', 'host@ippa-hoteles.com', 'IPHoteles2026!'],
                                    ['Wifi', 'Piso 1', 'P1', 'Costarica4828'],
                                    ['Wifi', 'Pisos restantes', 'Hache Palermo by iPPA', 'conectate'],
                                ]
                            }
                        ]
                    },
                    bedding: {
                        title: 'Categoría y Bedding',
                        sections: [
                            {
                                name: 'Configuración de Habitaciones',
                                data: [
                                    ['Detalle', 'Información'],
                                    ['Bedding', 'Todas se pueden hacer Twin y king'],
                                    ['Habs con futón', '103, 201, 202, 302, 303, 403'],
                                ]
                            }
                        ]
                    },
                    desayunos: {
                        title: 'Desayunos Nadina',
                        sections: [
                            {
                                name: 'Datos del Proveedor',
                                data: [
                                    ['Detalle', 'Información'],
                                    ['Nombre', 'Nadina Pastelería & Café'],
                                    ['Instagram', '<a href="https://www.instagram.com/nadinapasteleria/" target="_blank">@nadinapasteleria</a>'],
                                    ['Dirección', 'Costa Rica 4824 (Planta Baja del edificio)'],
                                    ['Contacto', 'Jorge (encargado) – 11 6941 000'],
                                    ['Horario', 'Mar a Sáb: 8 a 20hs | Dom: 10 a 20hs | Lun: Cerrado (*buscaremos opción para los lunes)']
                                ]
                            },
                            {
                                name: 'Procedimiento de envío diario',
                                data: [
                                    ['Detalle'],
                                    [`<div style="line-height:1.65; max-width:900px;">
                                        <p style="margin-top:0;">Enviar la planilla de desayunos a Nadina <strong>todos los días salvo domingos</strong> con la lista de huéspedes que desayunan ese día.</p>
                                        <ol style="margin:0.75em 0 0 1.25em; padding:0;">
                                            <li style="margin-bottom:0.75em;">Ingresar al PMS de Hache Palermo y navegar a <strong>Misceláneos → Reportes → Planilla de desayuno</strong>.</li>
                                            <li style="margin-bottom:0.75em;">Descargar el PDF que genera el sistema.</li>
                                            <li style="margin-bottom:0.75em;">Recortar <strong>solo la tabla de huéspedes</strong> (columnas Huésped, Llegada, Salida, Noc y A/C), como se muestra en la referencia.</li>
                                            <li style="margin-bottom:0.75em;">Enviar a la cafetería la parte recortada (Jorge – 11 6941 000).</li>
                                        </ol>
                                        <p style="margin:1em 0 0; padding:10px 12px; background:#fef2f2; border-left:4px solid #dc2626; border-radius:4px; color:#b91c1c; font-weight:600;">
                                            <strong style="color:#991b1b;">⚠ Importante:</strong> la planilla debe mostrar <strong>nombres y apellidos</strong> de las personas a desayunar y la <strong>cantidad</strong> (A/C). <strong>No</strong> debe incluir el número de reserva.
                                        </p>
                                        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:24px; margin-top:24px; align-items:start;">
                                            <div style="text-align:center;">
                                                <p style="margin:0 0 8px; font-weight:600; color:#374151;">Paso 1 — Ubicar la planilla</p>
                                                <img src="Media/desayunos_nadina_reporte.png" alt="Misceláneos, Reportes, Planilla de desayuno" style="width:auto; max-width:100%; height:auto; border-radius:8px; border:1px solid #ddd; box-shadow:0 2px 8px rgba(0,0,0,.06);" loading="lazy" />
                                            </div>
                                            <div style="text-align:center;">
                                                <p style="margin:0 0 8px; font-weight:600; color:#374151;">Paso 2 — Parte a recortar y enviar</p>
                                                <img src="Media/desayunos_nadina_recorte.png" alt="Tabla de huéspedes a enviar a Nadina" style="width:auto; max-width:100%; height:auto; border-radius:8px; border:1px solid #ddd; box-shadow:0 2px 8px rgba(0,0,0,.06);" loading="lazy" />
                                            </div>
                                        </div>
                                    </div>`]
                                ]
                            },
                            {
                                name: 'Menú de Desayuno Continental',
                                data: [
                                    ['Componente', 'Opciones'],
                                    ['Infusión (elegir 1)', 'Café tradicional / Café con leche / Té en hebras'],
                                    ['Comida (elegir 1)', '• Dos medialunas<br>• Dos tostadas medianas con 2 dips a elección (manteca, queso crema, dulce de leche o mermelada)<br>• Fruta de estación con yogurt natural y granola<br>• Masitas rellenas, cuadraditos de lemon pie o brownie<br>• Bowl de huevos revueltos con mini tostada y palta'],
                                    ['Bebida', 'Copón de jugo de naranja'],
                                    ['Nota', 'Cualquier extra puede solicitarse directamente en el local']
                                ]
                            }
                        ]
                    },
                    bankData: {
                        title: 'Datos Bancarios',
                        sections: [
                            {
                                name: 'Información de Cuenta',
                                data: [
                                    ['Concepto', 'Detalle'],
                                    ['Razón Social', 'Rudi SA'],
                                    ['Cuit', '30-71448142-4'],
                                    ['CBU', '0070677920000002492951'],
                                    ['Banco', 'Galicia']
                                ]
                            }
                        ]
                    }
                }
            },
            aldeaAndina: {
                name: 'Aldea Andina by iPPA',
                subsections: {
                    
                    informacionGeneral: {
                        title: 'Información general',
                        sections: [
                            {
                                name: '1. Entorno y segmentos de huéspedes',
                                data: [
                                    ['Contenido'],
                                    [`<div style="line-height:1.65; max-width:900px;">
<p><strong>Ubicación:</strong> Aprox. 2 km del Centro Cívico, en la ladera del Cerro Otto (Av. de los Pioneros, 2.ª arteria principal).</p>
<p><strong>Segmento VENTA:</strong></p>
<ul style="margin:0.35em 0 0.5em 1.25em;">
<li><strong>Julio / Agosto:</strong> Familias + ski.</li>
<li><strong>Enero:</strong> Playa, trekking y actividades de verano.</li>
</ul>
<p><strong>Segmento SOCIOS (tiempo compartido — RHS / RCI):</strong></p>
<ul style="margin:0.35em 0 0 1.25em;">
<li>Perfil habitual: personas mayores que valoran la cercanía al centro y el estado del inmueble.</li>
<li>Orientación a tiempo compartido: remises, restaurante y excursiones.</li>
<li>Si un socio desea hablar o necesita asistencia específica, derivar al teléfono de <strong>Experiencia</strong> (tiempo compartido).</li>
</ul>
</div>`]
                                ]
                            },
                            {
                                name: '2. Ubicación y entorno',
                                data: [
                                    ['Contenido'],
                                    [`<div style="line-height:1.65; max-width:900px;">
<p><strong>Dirección:</strong> Av. de los Pioneros Km 2, San Carlos de Bariloche, Río Negro.</p>
<p><strong>Entorno:</strong> Predio de 2 hectáreas de bosque nativo en las faldas del Cerro Otto.</p>
<p><strong>Proximidad:</strong></p>
<ul style="margin:0.35em 0 0 1.25em;">
<li>A 18 cuadras (aprox. 2 km) del Centro Cívico.</li>
<li>A 15 km del Centro de Ski Cerro Catedral.</li>
<li>A 18 km del Aeropuerto Internacional de Bariloche.</li>
</ul>
</div>`]
                                ]
                            },
                            {
                                name: '3. Acceso, transporte y estacionamiento',
                                data: [
                                    ['Contenido'],
                                    [`<div style="line-height:1.65; max-width:900px;">
<p><strong>Cómo llegar:</strong> Remis, auto rentado o vehículo propio. Al indicar el acceso, informar siempre qué estacionamiento debe utilizar el huésped.</p>
<p><strong>Ingreso al predio:</strong></p>
<ul style="margin:0.35em 0 0.5em 1.25em;">
<li><strong>Módulo Abedules:</strong> ingresar por Av. de los Pioneros.</li>
<li><strong>Resto de edificios:</strong> ingresar por el acceso alternativo (no Pioneros).</li>
</ul>
<p><strong>Colectivos:</strong> Líneas <strong>50</strong> y <strong>51</strong> al centro · Línea <strong>52</strong> al Cerro Catedral. Recomendar la app <strong>Mi Bus Bariloche</strong>.</p>
<p><strong>Estacionamiento:</strong> Gratuito dentro del predio (un auto por unidad; Abedules tiene estacionamiento exclusivo). Extras y visitas: estacionamiento de visita. Informar patente en el check-in.</p>
</div>`]
                                ]
                            },
                            {
                                name: '4. Bariloche: información y clima',
                                data: [
                                    ['Contenido'],
                                    [`<div style="line-height:1.65; max-width:900px;">
<p><strong>Turismo:</strong> <a href="https://barilocheturismo.gob.ar/" target="_blank">barilocheturismo.gob.ar</a></p>
<p><strong>Clima:</strong> <a href="https://www.rionegro.com.ar/clima-hoy/bariloche/" target="_blank">Clima en Bariloche (Río Negro)</a></p>
<p>Las alertas climáticas puntuales serán comunicadas por el equipo operativo.</p>
</div>`]
                                ]
                            },
                            {
                                name: '5. Horarios clave',
                                data: [
                                    ['Contenido'],
                                    [`<div style="line-height:1.65; max-width:900px;">
<ul style="margin:0; padding-left:1.25em;">
<li><strong>Check-in:</strong> 16:00 hs.</li>
<li><strong>Check-out:</strong> 10:00 hs. (Late Check Out sujeto a disponibilidad, con cargo adicional).</li>
<li><strong>Desayuno:</strong> Buffet de 08:00 a 10:30 hs (o hasta las 11:00 hs según temporada). Extras con costo; ver linktree del hotel.</li>
<li><strong>Restaurante El Bodegón del Lago:</strong> Abierto de 08:00 a 23:30 hs (puede variar según temporada).</li>
</ul>
</div>`]
                                ]
                            },
                            {
                                name: '6. Servicios e instalaciones',
                                data: [
                                    ['Contenido'],
                                    [`<div style="line-height:1.65; max-width:900px;">
<p><strong>Conectividad:</strong> Wi-Fi gratuito en áreas comunes y unidades. Usuario <strong>Andina</strong> / Acceso <strong>Aldea2021</strong>. Pueden producirse microinterrupciones por viento (ver textos de contención).</p>
<p><strong>Alojamiento:</strong> 34 unidades entre habitaciones de hotel y departamentos equipados (algunos con cocina e hidromasaje).</p>
<p><strong>Acceso a habitaciones:</strong> Por código (TTHoteles).</p>
<p><strong>Desayuno:</strong> Buffet; extras con costo (linktree). No está alcanzado por descuentos. Las promociones de alojamiento nunca incluyen desayuno.</p>
<p><strong>Restaurante — El Bodegón del Lago:</strong> Cocina casera con vistas al Lago Nahuel Huapi. <a href="https://www.elbodegondellago.com.ar" target="_blank">www.elbodegondellago.com.ar</a></p>
<p><strong>Spa:</strong> Pileta climatizada interior/exterior (todo en una), sauna, jacuzzi y duchas. Personal permanente; horario de atención <strong>11:00 a 22:00 hs</strong>. Doble acceso al sector.</p>
<ul style="margin:0.35em 0 0.5em 1.25em;">
<li>Derivar al Spa consultas de disponibilidad y precios de masajes y servicios especiales.</li>
<li>Sauna y servicios especiales tienen costo adicional.</li>
<li>1 toallón por persona por estadía; recambio $1000. Si contrata masaje, incluye 20 min de sauna.</li>
<li>Masajes, quiropraxia y reflexología (consultar en Spa).</li>
</ul>
<p><strong>Excursiones y autos:</strong> Consultar linktree del hotel (incluir <strong>Grupo Visión</strong> para excursiones y <strong>Hertz</strong> para alquiler de autos).</p>
<p><strong>Sala de juegos:</strong> Juegos de mesa, metegol, raquetas y pelotas de tenis y ping pong.</p>
<p><strong>Quincho:</strong> Mediodía y noche, con costo adicional (bonificado). Reservar en recepción. La vajilla debe quedar limpia al desocupar; de lo contrario se cargará el lavado (11 USD TCV — oficial).</p>
<p><strong>Fogón:</strong> Mediodía y noche, sin costo adicional. Reservar en recepción.</p>
</div>`]
                                ]
                            },
                            {
                                name: '7. Acceso a habitaciones',
                                data: [
                                    ['Contenido'],
                                    [`<div style="line-height:1.65; max-width:900px;">
<p>Las unidades se abren con <strong>código</strong> mediante la app <strong>TTHoteles</strong> (ver Links y contraseñas).</p>
</div>`]
                                ]
                            },
                            
                            {
                                name: '8. Comercios de cercanía',
                                data: [
                                    ['Contenido'],
                                    [`<div style="line-height:1.65; max-width:900px;">
<p>Guía de comercios cercanos <a href="Guia_Aldea_Andina_Bariloche_servicios_gastronomia.docx" download>aquí</a>.</p>
</div>`]
                                ]
                            },
                            {
                                name: '9. Datos técnicos y normativas',
                                data: [
                                    ['Contenido'],
                                    [`<div style="line-height:1.65; max-width:900px;">
<p><strong>Mascotas:</strong> No se admiten.</p>
<p><strong>Limpieza:</strong> Lunes a sábado de 9:00 a 16:00 hs. Domingos sin housekeeping.</p>
<p><strong>Invitados:</strong> No permitido el ingreso de personas no alojadas a unidades ni espacios comunes sin autorización de Administración.</p>
<p><strong>Sostenibilidad:</strong> Programa de compromiso ambiental dentro del Parque Nacional Nahuel Huapi.</p>
</div>`]
                                ]
                            },
                            {
                                name: '10. Quejas habituales y textos de contención',
                                data: [
                                    ['Tema', 'Texto sugerido'],
                                    ['Televisión (24", cable)', `<div style="line-height:1.55; max-width:900px; font-size:0.95em;"><p><strong>Motivo:</strong> TVs de 24 pulgadas y calidad del cable.</p><p>Lamentablemente, por el momento las habitaciones cuentan con este equipamiento y estándar de servicio de televisión de forma fija. Comprendemos perfectamente su descargo y lamentamos que este aspecto no sea de su total agrado ni cumpla con sus expectativas de entretenimiento durante su estadía.</p><p>Tomamos nota de sus comentarios respecto al tamaño de las pantallas y la señal, ya que la opinión de quienes nos eligen siempre es recibida para conocer la experiencia en nuestras instalaciones.</p><p>Agradecemos su comprensión y quedamos a su entera disposición para cualquier otra necesidad que pueda surgir durante el resto de su alojamiento.</p></div>`],
                                    ['Wi-Fi (viento)', `<div style="line-height:1.55; max-width:900px; font-size:0.95em;"><p><strong>Motivo:</strong> Microinterrupciones por ráfagas de viento.</p><p>Lamentablemente, las condiciones climáticas actuales y las fuertes ráfagas de viento en la zona generan microinterrupciones temporales en la estabilidad de la señal. Comprendemos perfectamente el malestar que esto ocasiona y lamentamos los inconvenientes que pueda causar en su conectividad durante este lapso.</p><p>Este tipo de fluctuaciones disminuye de forma natural a medida que el clima se estabiliza. Mientras tanto, seguimos atentos al comportamiento de la red para asegurar que el servicio se restablezca por completo en cuanto el factor climático lo permita.</p><p>Agradecemos enormemente su paciencia y comprensión ante esta situación ajena a nuestra operación, y quedamos a su entera disposición para lo que necesite.</p></div>`],
                                    
                                ]
                            },
                            
                            
                            {
                                name: '11. Preguntas frecuentes',
                                data: [
                                    ['Pregunta', 'Respuesta'],
                                    ['¿Qué es el pase del día?', 'Modalidad para disfrutar del Spa & Wellness (pileta climatizada in-out y jacuzzi). Horario Spa: 11:00 a 22:00 hs. Consultas: +54 9 2944 133356.'],
                                    ['¿Se pueden realizar pagos en cuotas?', 'Sí: opción de 3 cuotas sin interés los miércoles y sábados cuando aplica la promo. Requisito mínimo: 3 noches de estadía. Enviar link de pago configurado en 3 cuotas.'],
                                    ['¿Cuál es el horario de late check out?', 'Los late check out sin cargo se pueden autorizar hasta las 12:00, sujeto a disponibilidad; en casos excepcionales se puede autorizar más tarde.'],
                                    ['¿Cómo registro el vehículo del huésped?', 'Registrar la patente en la reserva: existe un campo "Vehículo" en el detalle del huésped. Importante para control de estacionamiento.'],
                                    ['¿Cuál es el horario del Spa?', 'El Spa atiende de 11:00 a 22:00 hs; ofrece pileta climatizada, sauna y jacuzzi. Para precios y masajes comunicarse al +54 9 2944 133356.'],
                                    ['¿Cuál es el costo del desayuno adicional?', 'El desayuno está disponible con opción de extras a costo; consultar el linktree del hotel o preguntar en recepción para precios actualizados.'],
                                    ['¿Pueden ingresar invitados a las unidades?', 'No se permite el ingreso de personas no alojadas a unidades ni espacios comunes sin autorización de Administración.'],
                                    ['¿Cuáles son los horarios de limpieza?', 'Housekeeping: lunes a sábado de 09:00 a 16:00 hs. Domingos no hay servicio de limpieza.'],
                                    ['¿Cómo reservo la cancha de tenis?', 'Reservas a través de Venice; la cancha tiene un costo informado en recepción.'],
                                    ['Guardan equipaje en la recepción?', 'Se puede guardar equipaje en el complejo, aunque tener en cuenta que hay un horario limitado mientras tengan personal.'],
                                ]
                            }
                        ]
                    }, 
                    links: {
                        title: 'Links y contraseñas',
                        sections: [
                            {
                                name: 'Accesos y plataformas',
                                data: [
                                    ['Nombre', 'Link', 'Usuario', 'Contraseña'],
                                    ['Wi-Fi', '-', 'Andina', 'Aldea2021'],
                                    ['Mail Aldea Andina', '-', 'host.aldeaandina@ippa-hoteles.com', 'Ippa0405!'],
                                    ['Payway', '-', 'host@ippa-hoteles.com', 'IPHoteles2025!!'],
                                    ['TTHoteles', '<a href="https://play.google.com/store/apps/details?id=com.sciener.hotela" target="_blank">Descargar app (Android)</a> · <a href="https://apps.apple.com/app/tthotel/id1440266680" target="_blank">Descargar app (iOS)</a>', 'asistente.operaciones@ippa-hoteles.com', 'IPHoteles2030!!'],
                                    ['PMS Venice', '<a href="https://s1.venicepms.com/ala551/admin/login" target="_blank">Login Venice PMS</a>', '-', '-'],
                                    ['El Bodegón del Lago', '<a href="https://www.elbodegondellago.com.ar" target="_blank">Sitio del restaurante</a>', '-', '-'],
                                    ['Turismo Bariloche', '<a href="https://barilocheturismo.gob.ar/" target="_blank">barilocheturismo.gob.ar</a>', '-', '-'],
                                    ['Clima Bariloche', '<a href="https://www.rionegro.com.ar/clima-hoy/bariloche/" target="_blank">Clima (Río Negro)</a>', '-', '-'],
                                    ['Info al huésped (web hotel)', '<a href="https://www.aldeaandinahotel.com/informacion-al-huesped/" target="_blank">Información al huésped</a>', '-', '-'],
                                    ['Farmacias de turno', '<a href="https://www.barilochense.com/servicios/farmacias" target="_blank">Información al huésped</a>', '-', '-']
                                ]
                            },
                            {
                                name: 'Linktree (referencias)',
                                data: [
                                    ['Ítem', 'Nota'],
                                    ['Desayuno extras', 'Consultar linktree del hotel'],
                                    ['Excursiones', 'Agregar / consultar Grupo Visión en linktree'],
                                    ['Alquiler de autos', 'Agregar / consultar Hertz en linktree']
                                ]
                            }
                        ]
                    },
                    bedding: {
                        title: 'Categoría y Bedding',
                        sections: [
                            {
                                name: 'Distribución de departamentos',
                                data: [
                                    ['Edificio Abedules (dtos 4/5 pax)', 'Edificio Cipresales (dtos 6/7 pax)'],
                                    ['725 (1 dormitorio, 1 baño, cocina y en el living dos sofa cama con una cama marinera)', '301 (1 dormitorio con cama matrimonial y baño, 1 dormitorio con dos camas de 1 plaza, otro baño, cocina y en el living dos sofa cama con una cama marinera)'],
                                    ['726 (1 dormitorio, 1 baño, cocina y en el living dos sofa cama con una cama marinera)', '302 (1 dormitorio con cama matrimonial y baño, 1 dormitorio con dos camas de 1 plaza, otro baño, cocina y en el living dos sofa cama con una cama marinera)'],
                                    ['727 (1 dormitorio, 1 baño, cocina y en el living dos sofa cama con una cama marinera)', '303 (1 dormitorio con cama matrimonial y baño, 1 dormitorio con dos camas de 1 plaza, otro baño, cocina y en el living dos sofa cama con una cama marinera)'],
                                    ['728 (1 dormitorio, 1 baño, cocina y en el living dos sofa cama con una cama marinera)', '304 (1 dormitorio con cama matrimonial y baño, 1 dormitorio con dos camas de 1 plaza, otro baño, cocina y en el living dos sofa cama con una cama marinera)'],
                                    ['729 (1 dormitorio, 1 baño, cocina y en el living dos sofa cama con una cama marinera)', '305 (1 dormitorio con cama matrimonial y baño, 1 dormitorio con dos camas de 1 plaza, otro baño, cocina y en el living dos sofa cama con una cama marinera)'],
                                    ['730 (1 dormitorio, 1 baño, cocina y en el living dos sofa cama con una cama marinera)', '306 (1 dormitorio con cama matrimonial y baño, 1 dormitorio con dos camas de 1 plaza, otro baño, cocina y en el living dos sofa cama con una cama marinera)'],
                                    ['731 (1 dormitorio, 1 baño, cocina y en el living dos sofa cama con una cama marinera)', ''],
                                    ['732 (1 dormitorio, 1 baño, cocina y en el living dos sofa cama con una cama marinera)', ''],
                                    ['733 (1 dormitorio, 1 baño, cocina y en el living dos sofa cama con una cama marinera)', ''],
                                    ['734 (1 dormitorio, 1 baño, cocina y en el living dos sofa cama con una cama marinera)', ''],
                                    ['735 (1 dormitorio, 1 baño, cocina y en el living dos sofa cama con una cama marinera)', ''],
                                    ['736 (1 dormitorio, 1 baño, cocina y en el living dos sofa cama con una cama marinera)', ''],
                                    ['Edificio Arrayanes (dtos 4/5 pax y 6/7 pax)', 'Edificio Sorbus (dtos 6/7 pax)'],
                                    ['101 (1 dormitorio con cama matrimonial, 1 baño, cocina y en el living dos sofa cama con una cama marinera)', '111 (1 dormitorio con cama matrimonial, 1 baño, cocina y en el living dos sofa cama con una cama marinera)'],
                                    ['102 (1 dormitorio, 1 baño, cocina y en el living dos sofa cama con una cama marinera)', '111 BIS (1 dormitorio con cama matrimonial, 1 baño)'],
                                    ['103 (1 dormitorio con cama matrimonial, 1 baño, cocina y en el living dos sofa cama con una cama marinera)', '112 (1 dormitorio con cama matrimonial, 1 baño, cocina y en el living dos sofa cama con una cama marinera)'],
                                    ['104 (1 dormitorio con cama matrimonial, 1 baño, cocina y en el living dos sofa cama con una cama marinera)', '112 BIS (1 dormitorio con cama matrimonial, 1 baño)'],
                                    ['105 (1 dormitorio con cama matrimonial, 1 baño, cocina y en el living dos sofa cama con una cama marinera)', '114 (1 dormitorio con cama matrimonial, 1 baño, cocina y en el living dos sofa cama con una cama marinera)'],
                                    ['106 (2 dormitorios con cama matrimonial, 1 baño, cocina y living con dos sofa cama con una cama marinera)', '114 BIS (1 dormitorio con cama matrimonial, 1 baño)'],
                                    ['107 (1 dormitorio con cama matrimonial, 1 dormitorio con dos camas de 1 plaza, cocina y living con dos sofa cama con una cama marinera)', '115 (1 dormitorio con cama matrimonial, 1 baño, cocina y en el living dos sofa cama con una cama marinera)'],
                                    ['108 (1 dormitorio con cama matrimonial, 1 baño, cocina y en el living dos sofa cama con una cama marinera)', '115 BIS (1 dormitorio con cama matrimonial, 1 baño)']
                                ]
                            }
                        ]
                    },
                    bankData: {
                        title: 'Datos Bancarios',
                        sections: [
                            {
                                name: 'Información de Cuenta',
                                data: [
                                    ['Concepto', 'Detalle'],
                                    ['Razon social', 'TRESBES SA'],
                                    ['Cuit', '30-71155821-3'],
                                    ['Cuenta Corriente en Pesos N°', '0002102-9 142-1'],
                                    ['CBU', ' 0070142220000002102913'],
                                ]
                            }
                        ]
                    },
                    mapaComplejo: {
                        title: 'Mapa del complejo',
                        sections: [
                            {
                                name: 'Plano del predio',
                                data: [
                                    ['Vista'],
                                    ['<div style="text-align:center; padding:12px 0;"><img src="Media/Mapa_AldeaAndina.jpg" alt="Mapa del complejo Aldea Andina by iPPA" style="max-width:100%; max-height:85vh; width:auto; height:auto; border-radius:8px; border:1px solid #ddd; box-shadow:0 2px 8px rgba(0,0,0,.08);" loading="lazy" /></div>']
                                ]
                            }
                        ]
                    }, 
                   
                    codigosAlarma: {
                        title: 'Alarma y códigos',
                        sections: [
                            {
                                name: 'Códigos por departamento',
                                customRender: 'alarmaCodes',
                                codes: [
                                    ['725', '2245'], ['726', '9977'], ['729', '4445'], ['730', '5567'],
                                    ['733', '6678'], ['734', '7789'], ['727', '7688'], ['728', '5512'],
                                    ['731', '0071'], ['732', '6631'], ['735', '8861'], ['736', '6431'],
                                    ['101', '5893'], ['102', '6547'], ['103', '6358'], ['104', '5896'],
                                    ['105', '4787'], ['106', '6523'], ['107', '5879'], ['108', '8879'],
                                    ['301', '5557'], ['302', '6655'], ['303', '9876'], ['304', '5588'],
                                    ['305', '1401'], ['306', '6987'], ['111', '7688'], ['111BIS', '5512'],
                                    ['112', '0071'], ['112 BIS', '6631'], ['114', '8861'], ['114 BIS', '6431'],
                                    ['115', '3523'], ['115 BIS', '1204']
                                ]
                            },
                            {
                                name: 'Panel de alarma (Paradox)',
                                data: [
                                    ['Vista'],
                                    ['<div style="text-align:center; padding:12px 0;"><img src="Media/Alarma_AldeaAndina.jpg" alt="Panel de alarma Aldea Andina" style="max-width:100%; max-height:70vh; width:auto; height:auto; border-radius:8px; border:1px solid #ddd; box-shadow:0 2px 8px rgba(0,0,0,.08);" loading="lazy" /><p style="margin-top:12px; color:#8896ae; font-size:13px; line-height:1.5;">Ingrese el código del departamento para activar o desactivar la alarma. Si no posee código, solicitarlo en recepción.</p></div>']
                                ]
                            }
                        ]
                    }
                }
            },
            procedimientos: {
    name: 'Procedimientos Administrativos',
    subsections: {
        cobroClover: {
            title: 'Instrucciones: Cobro con Clover',
            sections: [
                {
                    name: 'Modificación en el Procedimiento de Facturación',
                    data: [
                        ['Detalle del Procedimiento'],
                        ['Por razones administrativas vinculadas al control y seguimiento de los pagos realizados a través del Link de Clover y su posterior acreditación, hemos implementado una modificación en el procedimiento de facturación y aplicación de estos cobros en el sistema.'],
                        ['<div style="text-align:center; padding: 20px;"><img src="Media/clover.jpg" alt="Instructivo Clover" style="max-width:100%; border-radius:8px; border: 1px solid #ddd;"></div>'],
                        ['<strong>1. Imputación de Tarjetas:</strong> Los pagos efectuados mediante el Link de Clover deberán imputarse utilizando la misma tarjeta de crédito/débito que haya utilizado el huésped (Ej: Si abonó con Visa, la factura se emite como Visa).'],
                        ['<strong>2. Origen de Información:</strong> La información se obtiene de los mails automáticos que llegan a la casilla de cada hotel cuando el huésped utiliza el link.'],
                        ['<strong>3. Contacto al Huésped:</strong> Una vez aplicado el pago, contactar al huésped con la plantilla "Contacto – Pago aprobado", adjuntando la factura.'],
                        ['<strong>4. Responsabilidad por Turno:</strong> Cada turno es responsable de imputar los cobros recibidos durante su horario. Nadie debe retirarse sin haber aplicado todos los pagos.']
                    ]
                }
            ]
        },
        facturacionAA: {
            title: 'Procedimiento de facturación AA',
            sections: [
                {
                    name: 'Procedimiento Cobranza Aldea Andina',
                    data: [
                        ['Detalle'],
                        [`<div style="line-height:1.65; max-width:900px;">
                            <p><strong>Procedimiento Cobranza Aldea Andina:</strong></p>
                            <ul style="margin:0.5em 0 0 1.25em;">
                                <li>Antes de cobrar una tarifa se tienen que adelantar las noches: “adelantar noches &gt; Adelantar todas”. Esto hace que se carguen todos los pagos por adelantado y se pueda saber exactamente cuánto hay que cobrar (ver Imagen 1 y 2).</li>
                                <li><strong>IMPORTANTE:</strong> luego de esto, automáticamente se guarde la reserva.</li>
                                <li>Luego tendrán en la cuenta el monto total a cobrar (ver Imagen 3).</li>
                                <li>Al cobrar exactamente el importe, ir a “facturar”; en ese caso hay que ingresar el método de pago y automáticamente les ingresa el importe total (ver Imagen 4).</li>
                                <li>Luego se selecciona el tipo de factura a emitir (ver Imagen 5).</li>
                            </ul>
                            <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(340px,1fr)); gap:20px; margin-top:20px; align-items:start; max-width:1200px; margin-left:auto; margin-right:auto;">
                                <div style="text-align:center;">
                                    <img src="Media/image1.png" alt="Imagen 1 procedimiento" style="width:auto; max-width:100%; height:auto; border-radius:8px; border:1px solid #ddd;" />
                                    <p style="margin:8px 0 0;font-size:0.95rem;color:#4b5563;">Imagen 1</p>
                                </div>
                                <div style="text-align:center;">
                                    <img src="Media/image2.png" alt="Imagen 2 procedimiento" style="width:auto; max-width:100%; height:auto; border-radius:8px; border:1px solid #ddd;" />
                                    <p style="margin:8px 0 0;font-size:0.95rem;color:#4b5563;">Imagen 2</p>
                                </div>
                                <div style="text-align:center;">
                                    <img src="Media/image3.png" alt="Imagen 3 procedimiento" style="width:auto; max-width:100%; height:auto; border-radius:8px; border:1px solid #ddd;" />
                                    <p style="margin:8px 0 0;font-size:0.95rem;color:#4b5563;">Imagen 3</p>
                                </div>
                                <div style="text-align:center;">
                                    <img src="Media/image4.png" alt="Imagen 4 procedimiento" style="width:auto; max-width:100%; height:auto; border-radius:8px; border:1px solid #ddd;" />
                                    <p style="margin:8px 0 0;font-size:0.95rem;color:#4b5563;">Imagen 4</p>
                                </div>
                                <div style="text-align:center;">
                                    <img src="Media/image5.png" alt="Imagen 5 procedimiento" style="width:auto; max-width:100%; height:auto; border-radius:8px; border:1px solid #ddd;" />
                                    <p style="margin:8px 0 0;font-size:0.95rem;color:#4b5563;">Imagen 5</p>
                                </div>
                            </div>
                        </div>`]
                    ]
                }
            ]
        }
    }
},
checklist: {
    name: 'CheckLists',
    subsections: {
        tm: {
    title: 'CheckList Turno Mañana',
    sections: [{
        name: 'Instrucciones Detalladas',
        data: [
            ['Acciones a realizar:'],
            ['• Repasar y actualizar Trello junto con TN.'],
            ['• Abrir Caja en Venice.'],
            ['• Revisar llegadas del día y repasar asignación según requerimientos especiales.'],
            ['• <strong>InSoho / Filiberto / Baires:</strong> Preparar Report de habitaciones para Hskp.'],
            ['• <strong>Contactar ingresos del día con la plantilla correspondiente:</strong><br>' +
             '&nbsp;&nbsp;- "Mensaje Bienvenida" (Ingresos completos)<br>' +
             '&nbsp;&nbsp;- "Bienvenida WCI pendiente" (Pagado, sin WCI)<br>' +
             '&nbsp;&nbsp;- "Bienvenida Pago Pendiente" (WCI hecho, sin pago)<br>' +
             '&nbsp;&nbsp;- "Bienvenida WCI y Pago Pendiente" (Nada completado)'],
            ['• <strong>Check Outs:</strong> Contactar con la plantilla "Dia de Check Out".'],
            ['• <strong>Seguimiento:</strong> Contactar con "Contacto 1er Noche" a quienes ingresaron ayer y se quedan más de 1 día.'],
            ['• <strong>Limpieza:</strong> Contactar huéspedes LongStay con plantilla "Contacto InHouse - LongStay".'],
            ['• <strong>Filiberto:</strong> Informar a JDD desayunos del día.'],
            ['• Informar en grupos de Operaciones salidas o pedidos especiales para HSKP o Manager.'],
            ['• <strong>InSoho:</strong> Preparar códigos de acceso en TTLOCK una vez firme la asignación.'],
            ['• Cerca de las 11 AM verificar tipo de cambio BNA y actualizar.'],
            ['• Realizar seguimiento de Check Outs pendientes después de las 11 Hrs y verificar cierre en sistema.'],
            ['• A medida que las habs. estén limpias, enviar plantilla "Envío de Accesos" y realizar Check In en sistema.'],
            ['• <strong>Cierre:</strong> Verificar bandeja de mails vacía, Trello actualizado y cierre de caja en Venice.']
        ]
    }],
    footer: `
        <a href="Media/CheckTM.docx" class="download-btn" download>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Descargar Checklist Turno Mañana
        </a>
    `
},
        tt: {
    title: 'CheckList Turno Tarde',
    sections: [{
        name: 'Instrucciones Detalladas',
        data: [
            ['Acciones a realizar:'],
            ['• Repasar y actualizar Trello junto con Host TM.'],
            ['• Abrir Caja en Venice.'],
            ['• Verificar disponibilidad del día: ingresos por llegar y Late Check Out pendientes.'],
            ['• <strong>Limpieza:</strong> Chequear con Hskp dptos con ingreso pendiente que aún figuren sucios.'],
            ['• <strong>Contactar ingresos del día pendientes según corresponda:</strong><br>' +
             '&nbsp;&nbsp;- "Dpto Listo - WCI y Pago Pendiente"<br>' +
             '&nbsp;&nbsp;- "Dpto Listo - WCI Pendiente"<br>' +
             '&nbsp;&nbsp;- "Dpto Listo - Pago Pendiente" '],
            ['• <strong>Contactar Ingresos (48 horas):</strong> Iniciar proceso de Check In según situación (Contacto 48 Hrs, WCI o Pago Pendiente).'],
            ['• <strong>Contactar Ingresos (24 horas):</strong> Contactar ingresos del día siguiente con procesos pendientes.'],
            ['• <strong>Nuevas Reservas:</strong> Verificar reservas generadas en las últimas 24 hrs y enviar plantilla "Agradecimiento".'],
            ['• <strong>Sin contacto:</strong> Contactar por extranet o mail a quienes no tengan teléfono para que escriban al WUP.'],
            ['• <strong>Pre Check Out:</strong> Enviar plantilla "Positiva" o "Negativa" a las salidas de mañana (Preferentemente entre 19 y 21 hrs)].'],
            ['• <strong>Cierre:</strong> Verificar bandeja de entrada vacía, Trello actualizado y cierre de caja en Venice.']
        ]
    }],
    footer: '<div style="margin-top:20px; text-align:center;"><a href="Media/CheckTT.docx" class="download-btn" download style="background-color: #2b579a;">📄 Descargar Checklist Turno Tarde</a></div>'
},
        tn: {
    title: 'CheckList Turno Noche - Auditoría',
    sections: [{
        name: 'Tareas Iniciales y Auditoría',
        data: [
            ['Acciones iniciales:'],
            ['• Revisar Trello con novedades junto con el compañero saliente.'],
            ['• Revisar junto con TT los arribos pendientes y reconfirmar requerimientos especiales.'],
            ['<strong>AUDITORÍA (Todas las propiedades):</strong>'],
            ['• Verificar que todas las reservas In House tengan el Web Check In realizado.'],
            ['• Verificar carga y cobro del Cleaning Fee en las reservas correspondientes.'],
            ['• Confirmar el pago total de la estadía para todas las reservas In House.'],
            ['• Completar informe de auditoría "Cuentas con Saldo".'],
            ['• Controlar carga correcta de Mercado, Origen, Agencia, Empresa y Tipo de Reserva.'],
            ['• Verificar emisión de facturas (cobros banco) y recibos (WeTravel).'],
            ['• Completar informe de auditoría "Descuentos Realizados".'],
            ['• <strong>Rodar auditoría</strong> en todas las propiedades.'],
            ['<strong>LUEGO DE RODAR AUDITORÍA:</strong>'],
            ['• Controlar carga automática (Channel VS Venice) para el día que comienza y 3 días vista.'],
            ['• <strong>Cobros NRF:</strong> Cobrar todas las reservas NRF generadas en el día cerrado.'],
            ['• <strong>Cobros Flexibles:</strong> Cobrar reservas con ingreso en 48 horas.'],
            ['• <strong>CTA CTE / Transferencia:</strong> Cobrar a clientes que hacen Check Out ese día.'],
            ['• Verificar que no queden Check Outs con saldo pendiente (si hay, informar al TM).'],
            ['• Ajustar a $0 los saldos por diferencias de tipo de cambio.'],
            ['• <strong>Milenia:</strong> Generar QR de acceso en HIPCAM y enviarlos al WhatsApp de Host.'],
            ['• Enviar recibos/facturas con plantilla "Contacto Pago Aprobado" o informar "Pago Denegado".'],
            ['• <strong>Cierre final:</strong> Verificar mails respondidos, Trello actualizado y cierre de caja en Venice.']
        ]
    }],
    footer: '<div style="margin-top:20px; text-align:center;"><a href="Media/CheckTN.docx" class="download-btn" download style="background-color: #2b579a;">📄 Descargar Checklist Turno Noche</a></div>'
}
    },
},independencia: {
    name: 'Independencia by iPPA',
    subsections: {
        links: {
            title: 'Links y contraseñas',
            sections: [
                {
                    name: 'Información General',
                    data: [
                        ['Nombre', 'Link', 'Usuario', 'Contraseña'],
                        ['Mail', '-', 'host.bahindependencia@ippa-hoteles.com', 'IPHoteles2026@'],
                        ['Tecnolav', '<a href="https://clientes.tecnolav.com.ar" target="_blank">Login Tecnolav</a>', 'host.bahindependencia@ippa-hoteles.com', 'Bahhotel2026'],
                    ]
                }
            ]
        },
        bedding: {
            title: 'Categoría y Bedding',
            sections: [
                {
                    name: 'Configuración',
                    data: [
                        ['Detalle', 'Información'],
                        ['Tipo', 'Departamentos'],
                        ['Camas', 'Consultar planilla']
                    ]
                }
            ]
        },
        bankData: {
            title: 'Datos Bancarios',
            sections: [
                {
                    name: 'Cuenta',
                    data: [
                        ['Concepto', 'Detalle'],
                        ['Razón Social', 'Rudi SA'],
                        ['Cuit', '30-71448142-4'],
                                                ['CBU', '0070677920000002471468'],
                                                ['Banco', 'Galicia'],
                    ]
                }
            ]
        },accesos: {
    title: 'Accesos',
    sections: [
        {
            name: 'Códigos de Cajas',
            data: [
                ['Caja', 'Apartamento', 'Contraseña'],
                ['1', '14D', '2941'],
                ['2', '14J', '8305'],
                ['3', '14E', '1762'],
                ['4', '14F', '6493'],
                ['5', '13E', '4028'],
                ['6', '13G', '9517'],
                ['7', '13H', '3850'],
                ['8', '14H', '0000'],
                ['9', '13F', '4217'],
                ['10', '14G', '7158'],
            ]
        }
    ]
}
    }
},
            filiberto: {
                name: 'Filiberto by iPPA',
                subsections: {
                    links: {
                        title: 'Links y contraseñas',
                        sections: [
                            {
                                name: 'Información General',
                                data: [
                                    ['Nombre', 'Link', 'Usuario', 'Contraseña'],
                                    ['Link de pago Clover', '<a href="https://www5.ipg-online.com/vt/login" target="_blank">Login Clover</a>', '5930718562712', 'Filiberto2026!'],
                                    ['Celular', '-', '-', '1564'],
                                    ['Mail','-', 'host.filiberto@ippa-hoteles.com', 'IPHoteles2024@'],
                                    ['Trello', '<a href="https://id.atlassian.com/login?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback%3Fdisplay%3DeyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%253D%253D&display=eyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%3D%3D" target="_blank">Login Trello</a>', 'host.filiberto@ippa-hoteles.com', 'IPHoteles2024'],
                                    ['TESA', '-', 'nahuelz', 'nahuelz1']
                                ]
                            },
                            {
                                name: 'Tecnología',
                                data: [
                                    ['Nombre', 'Link', 'Usuario', 'Contraseña'],
                                    ['Roomcloud Host', '<a href="https://secure.roomcloud.net/be/owners_area/index.jsp" target="_blank">Login RoomCloud</a>', 'Host iPPA', 'IPHoteles2026!'],
                                    ['We Travel', '<a href="https://www.wetravel.com/?utm_source=google&utm_medium=cpc&utm_campaign=23102652127-186858068379&utm_content=778068413481-wetravel&utm_term=wetravel&utm_campaign=Brand&utm_source=adwords&utm_medium=ppc&hsa_acc=8913619154&hsa_cam=23102652127&hsa_grp=186858068379&hsa_ad=778068413481&hsa_src=g&hsa_tgt=kwd-372105183025&hsa_kw=wetravel&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gad_source=1&gad_campaignid=23102652127&gbraid=0AAAAAoi4PsPT9gN2QA3hdDwk-6ARGZmL_&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xPRLZ8haCw3CPua-emVmxcJbu2ewn1j3fy6lnq2v7pk8IhUAnZyXzQaAihwEALw_wcB" target="_blank">Login We travel</a>', 'host.filiberto@ippa-hoteles.com', 'IPHoteles2024_!?']
                                ]
                            },
                            {
                                name: "OTA's",
                                data: [
                                    ['Nombre', 'Link', 'Usuario', 'Contraseña'],
                                    ['BookiP', '<a href="https://prd-iph.opti-hospitalitysuite.com/auth/login/login.php" target="_blank">Login BookiP</a>', 'hostippa', 'IPHoteles2024'],
                                    ['Hyperguest', '<a href="https://app.hyperguest.com/login" target="_blank">Login Hyperguest</a>', 'host@ippa-hoteles.com', 'Pide confirmación por mail'],
                                    ['Despegar', '<a href="https://extranet.despegar.com/extranet-hotels/bkd/hotels/dashboard/6057403" target="_blank">Login Despegar</a>', 'Dana-Croatto', 'Host2026!'],
                                    ['Almundo', '<a href="https://jintranet.trendoperadora.com.br/extranet/login.aspx?ReturnUrl=%2fextranet%2falojamiento%2fdefault.aspx%3falojamiento%3d4157&alojamiento=4157" target="_blank">Login Almundo</a>', 'FilibertobyiPPA2', 'IPHoteles2025!!'],
                                    ['Hotelbeds', '<a href="https://maxiroom.hotelbeds.com/#/login" target="_blank">Login Hotelbeds</a>', 'IPPA', 'IPHoteles2026*'],
                                ]
                            }
                        ]
                    },
                    bedding: {
                        title: 'Categoría y Bedding',
                        sections: [
                            {
                                name: 'Configuración de Habitaciones',
                                data: [
                                    ['Hab con Terminación', 'Tipo de Habitación', 'Configuración', 'Notas'],
                                    ['02', 'Twin', 'Todas las habitaciones terminadas en 02', 'Dos camas individuales'],
                                    ['03', 'Matrimonial (MAT)', 'No se pueden separar', 'Incluye: 104, 105, 504'],
                                    ['06', 'Categoría Superior', 'Todas las habitaciones terminadas en 06', 'Mat + Cama/Tres camas'],
                                    ['01', 'Categoría Familiar', '', 'Todas menos la 501 Se pueden hacer cuádruple twin']
                                ]
                            }
                        ]
                    },
                    bankData: {
                        title: 'Datos Bancarios',
                        sections: [
                            {
                                name: 'Información de Cuenta',
                                data: [
                                    ['Concepto', 'Detalle'],
                                    ['Razón Social', 'NUEVA JUSTA SRL'],
                                    ['Número de cuenta', 'CC ARS 001-5760549-2'],
                                    ['Cuit', '30718562712'],
                                    ['CBU', '0270001410057605490023'],
                                    ['Alias', 'GRANA.GAFAS.DESPERTO']
                                    

                                ]
                                
                            }
                            
                        ]
                    }
                }
            },
            milenia: {
                name: 'Milenia by iPPA',
                subsections: {
                    links: {
                        title: 'Links y contraseñas',
                        sections: [
                            {
                                name: 'Información General',
                                data: [
                                    ['Nombre', 'Link', 'Usuario', 'Contraseña'],
                                    ['Link de pago Clover', '<a href="https://www5.ipg-online.com/vt/login" target="_blank">Login Clover</a>', '5930718528018', 'IPHoteles2031!!'],
                                    ['Celular', '-', '-', '1564'],
                                    ['Hipcam', '-', 'asistente.operaciones@ippa-hoteles.com', 'IPHoteles2030!!'],
                                    ['Mail','-', 'host.mileniasoho@ippa-hoteles.com', 'IPHoteles2024'],
['Tecnolav', '<a href="https://clientes.tecnolav.com.ar" target="_blank">Login Tecnolav</a>', 'host.milenia@ippa-hoteles.com', 'Milenia2025'],
                                    ['Trello', '<a href="https://id.atlassian.com/login?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback%3Fdisplay%3DeyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%253D%253D&display=eyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%3D%3D" target="_blank">Login Trello</a>', 'host.filiberto@ippa-hoteles.com', 'IPHoteles2024'],
                                    ['Roomcloud Host', '<a href="https://secure.roomcloud.net/be/owners_area/index.jsp" target="_blank">Login RoomCloud</a>', 'Host iPPA', 'IPHoteles2026!'],
                                   
                                    ['We Travel', '<a href="https://www.wetravel.com/?utm_source=google&utm_medium=cpc&utm_campaign=23102652127-186858068379&utm_content=778068413481-wetravel&utm_term=wetravel&utm_campaign=Brand&utm_source=adwords&utm_medium=ppc&hsa_acc=8913619154&hsa_cam=23102652127&hsa_grp=186858068379&hsa_ad=778068413481&hsa_src=g&hsa_tgt=kwd-372105183025&hsa_kw=wetravel&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gad_source=1&gad_campaignid=23102652127&gbraid=0AAAAAoi4PsPT9gN2QA3hdDwk-6ARGZmL_&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xPRLZ8haCw3CPua-emVmxcJbu2ewn1j3fy6lnq2v7pk8IhUAnZyXzQaAihwEALw_wcB" target="_blank">Login We travel</a>', 'host.insoho@ippa-hoteles.com', 'InSoho2025'],

                                ]
                            },
                            {
                                name: "OTA's",
                                data: [
                                    ['Nombre', 'Link', 'Usuario', 'Contraseña'],
                                    ['BookiP', '<a href="https://prd-iph.opti-hospitalitysuite.com/auth/login/login.php" target="_blank">Login BookiP</a>', 'hostippa', 'IPHoteles2024'],
                                    ['Hyperguest', '<a href="https://app.hyperguest.com/login" target="_blank">Login Hyperguest</a>', 'host@ippa-hoteles.com', 'Pide confirmación por mail'],
                                ]
                            }
                        ]
                    },
                    bedding: {
                        title: 'Categoría y Bedding',
                        sections: [
                            {
                                name: 'Configuración de Habitaciones',
                                data: [
                                    ['Bedding y Equipamiento','Número'],
                                    ['HABITACIONES HACIA EL FRENTE:','TODAS LAS 01 Y 02'],
                                    ['HABITACIONES HACIA EL CONTRAFRENTE:','TODAS LAS 03 Y 04'],
                                    ['HABITACIONES QUE NO SE HACEN TWIN:','604, 704, 901, 403'],
                                    ['NO TIENE SOFA CAMA:', '801, 802, 604, 704, 901, 902, 402'],
                                    ['TIENEN MICROONDAS:','704 Y 604'],
                                    ['HABITACIONES CON 2 BAÑOS:','TODAS MENOS 901 Y 801']
                                ]
                            }
                        ]
                    },
                    mapping: {
                        title: 'Mapping',
                        sections: [
                            {
                                name: 'Estructura del edificio',
                                floors: [
                                    {
                                        floorLabel: 'PB / Duplex',
                                        rooms: {
                                            A: { unit: 'PB A', type: 'Loft', location: 'Contra Frente', isOurs: false, hasBalcony: false },
                                            B: { unit: 'Duplex', type: 'Loft', location: 'Contra Frente', isOurs: true, hasBalcony: false },
                                            C: null,
                                            D: null
                                        }
                                    },
                                    {
                                        floorLabel: 'Piso 1',
                                        rooms: {
                                            A: { unit: '101', type: 'Studio', location: 'Frente', isOurs: true, hasBalcony: true },
                                            B: { unit: '102', type: 'Studio Superior', location: 'Frente', isOurs: false, hasBalcony: true },
                                            C: { unit: '103', type: 'Studio', location: 'Contra Frente', isOurs: true, hasBalcony: true },
                                            D: { unit: '104', type: 'Studio Superior', location: 'Contra Frente', isOurs: false, hasBalcony: true }
                                        }
                                    },
                                    {
                                        floorLabel: 'Piso 2',
                                        rooms: {
                                            A: { unit: '201', type: 'Studio', location: 'Frente', isOurs: true, hasBalcony: true },
                                            B: { unit: '202', type: 'Studio Superior', location: 'Frente', isOurs: true, hasBalcony: true },
                                            C: { unit: '203', type: 'Studio', location: 'Contra Frente', isOurs: true, hasBalcony: true },
                                            D: { unit: '204', type: 'Studio Superior', location: 'Contra Frente', isOurs: true, hasBalcony: true }
                                        }
                                    },
                                    {
                                        floorLabel: 'Piso 3',
                                        rooms: {
                                            A: { unit: '301', type: 'Studio', location: 'Frente', isOurs: true, hasBalcony: true },
                                            B: { unit: '302', type: 'Studio Superior', location: 'Frente', isOurs: true, hasBalcony: true },
                                            C: { unit: '3C', type: 'Studio', location: 'Contra Frente', isOurs: false, hasBalcony: true },
                                            D: { unit: '304', type: 'Studio Superior', location: 'Contra Frente', isOurs: true, hasBalcony: true }
                                        }
                                    },
                                    {
                                        floorLabel: 'Piso 4',
                                        rooms: {
                                            A: { unit: '401', type: 'Studio', location: 'Frente', isOurs: true, hasBalcony: true },
                                            B: { unit: '402', type: 'Studio Superior', location: 'Frente', isOurs: true, hasBalcony: true },
                                            C: { unit: '403', type: 'Studio', location: 'Contra Frente', isOurs: true, hasBalcony: true },
                                            D: { unit: '404', type: 'Studio Superior', location: 'Contra Frente', isOurs: true, hasBalcony: true }
                                        }
                                    },
                                    {
                                        floorLabel: 'Piso 5',
                                        rooms: {
                                            A: { unit: '501', type: 'Studio', location: 'Frente', isOurs: true, hasBalcony: true },
                                            B: { unit: '502', type: 'Studio Superior', location: 'Frente', isOurs: true, hasBalcony: true },
                                            C: { unit: '503', type: 'Studio', location: 'Contra Frente', isOurs: false, hasBalcony: true },
                                            D: { unit: '504', type: 'Studio Superior', location: 'Contra Frente', isOurs: true, hasBalcony: true }
                                        }
                                    },
                                    {
                                        floorLabel: 'Piso 6',
                                        rooms: {
                                            A: { unit: '601', type: 'Studio', location: 'Frente', isOurs: true, hasBalcony: true },
                                            B: { unit: '6B', type: 'Studio Superior', location: 'Frente', isOurs: false, hasBalcony: true },
                                            C: { unit: '6C', type: 'Studio', location: 'Contra Frente', isOurs: false, hasBalcony: true },
                                            D: { unit: '604', type: 'Studio Superior', location: 'Contra Frente', isOurs: true, hasBalcony: true }
                                        }
                                    },
                                    {
                                        floorLabel: 'Piso 7',
                                        rooms: {
                                            A: { unit: '701', type: 'Studio', location: 'Frente', isOurs: true, hasBalcony: true },
                                            B: { unit: '7B', type: 'Studio Superior', location: 'Frente', isOurs: false, hasBalcony: true },
                                            C: { unit: '703', type: 'Studio', location: 'Contra Frente', isOurs: true, hasBalcony: true },
                                            D: { unit: '704', type: 'Studio Superior', location: 'Contra Frente', isOurs: false, hasBalcony: true }
                                        }
                                    },
                                    {
                                        floorLabel: 'Piso 8',
                                        rooms: {
                                            A: { unit: '801', type: 'Studio', location: 'Frente', isOurs: true, hasBalcony: true },
                                            B: { unit: '802', type: 'Studio Superior', location: 'Frente', isOurs: true, hasBalcony: true },
                                            C: { unit: '803', type: 'Studio', location: 'Contra Frente', isOurs: true, hasBalcony: true },
                                            D: { unit: '804', type: 'Studio Superior', location: 'Contra Frente', isOurs: true, hasBalcony: true }
                                        }
                                    },
                                    {
                                        floorLabel: 'Piso 9',
                                        rooms: {
                                            A: { unit: '901', type: 'Studio', location: 'Frente', isOurs: true, hasBalcony: true },
                                            B: { unit: '902', type: 'Studio Superior', location: 'Frente', isOurs: true, hasBalcony: true },
                                            C: { unit: '903', type: 'Studio', location: 'Contra Frente', isOurs: true, hasBalcony: true },
                                            D: { unit: '904', type: 'Studio Superior', location: 'Contra Frente', isOurs: true, hasBalcony: true }
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    desayunos: {
                        title: 'Desayunos',
                        sections: [
                            {
                                name: 'Información General',
                                data: [
                                    ['Detalle'],
                                    [`<div style="line-height: 1.8; padding: 10px;">
                                        <p><strong>Valor:</strong> USD 11.5 por persona</p>
                                        <p>En el desayuno podrán optar por <strong>1 infusión + 1 comida + 1 extra por día</strong>, es a la carta por lo que podrán elegir en el momento.</p>

                                        <p><strong>☕ Infusión:</strong></p>
                                        <ul>
                                            <li>Café de especialidad en cualquier tamaño</li>
                                            <li>Té en hebras</li>
                                            <li>Chocolatada</li>
                                        </ul>

                                        <p><strong>🥐 Comida:</strong></p>
                                        <ul>
                                            <li>Medialunas</li>
                                            <li>Croissant con J&Q o relleno de dulce</li>
                                            <li>Scone de tomillo y queso</li>
                                            <li>Tostadas con queso y mermelada (3 en variedad de panes)</li>
                                            <li>1 porción de torta</li>
                                            <li>Tostada de pan de campo con huevos, palta y aceite de oliva</li>
                                        </ul>

                                        <p><strong>🥤 Extra:</strong></p>
                                        <ul>
                                            <li>Vaso de jugo de naranja</li>
                                            <li>Vaso de limonada</li>
                                            <li>Botella de agua con o sin gas</li>
                                        </ul>
                                    </div>`]
                                ]
                            }
                        ]
                    },
                    bankData: {
                        title: 'Datos Bancarios',
                        sections: [
                            {
                                name: 'Información de Cuenta (ARS)',
                                data: [
                                    ['Concepto', 'Detalle'],
                                    ['Razón Social', 'FIDEICOMISO STAY HOME FIDEICOM '],
                                    ['Cuit', '30718528018'],
                                    ['Tipo y número de cuenta corriente en pesos ', '429-019952/2'],
                                    ['CBU', '0720429020000001995222'],
                                    ['Alias', 'milenia.by.ippa'],
                                ]
                            },
                            {
                                name: 'Información de Cuenta (USD)',
                                data: [
                                    ['Concepto', 'Detalle'],
                                    ['Beneficiary', 'Nassimoff Jonathan Javier'],
                                    ['Beneficiary Adress', '18800 NE 29th AVE #514 33180 Aventura'],
                                    ['Account Numer ', '6389525129'], 
                                    ['ABA/Routing', '121000248'], 
                                    ['Bank Adress', '420 montgomery St. San Francisco , CA 94104'] ,
['Bank Name', 'Wells Fargo Bank'] ,

                                ]
                            }
                        ]
                    }
                }
            },
            mileniaVidt: {
                name: 'Milenia Vidt by iPPA',
                subsections: {
                    links: {
                        title: 'Links y contraseñas',
                        sections: [
                            {
                                name: 'Información General',
                                data: [
                                    ['Nombre', 'Link', 'Usuario', 'Contraseña'],
                                    ['Mail Milenia Vidt', '-', 'Host.mileniavidt@ippa-hoteles.com', 'IPHoteles2026&'],
                                    ['Wifi', 'Piso 1', 'MileniaAp01', 'Milenia Wifi'],
                                    ['Wifi', 'Piso 2', 'Milenia AP02', 'Milenia Wifi'],
                                    ['Wifi', 'Piso 3', 'Milenia AP03', 'Milenia Wifi'],
                                    ['Wifi', 'Piso 4', 'Milenia AP04', 'Milenia Wifi'],
                                    ['Wifi', 'Piso 5', 'Milenia AP05', 'Milenia Wifi'],
                                    ['Wifi', 'Piso 6', 'Milenia AP06', 'Milenia Wifi'],
                                    ['Wifi', 'Piso 7', 'Milenia AP07', 'Milenia Wifi'],
                                    ['Wifi', 'Piso 8', 'Milenia AP08', 'Milenia Wifi'],
                                ]
                            }
                        ]
                    },
                    bedding: {
                        title: 'Categoría y Bedding',
                        sections: [
                            {
                                name: 'Configuración de Habitaciones',
                                data: [
                                    ['Bedding y Equipamiento', 'Número'],
                                    ['DPTO Standar:', '1 ambiente'],
                                    ['DPTO Superior:', '2 ambientes'],
                                    ['DUPLEX:', '2 pisos'],
                                    ['DEPTO 802:', '2 ambientes. Balcón que recorre toda la esquina; apartamento en forma de L'],
                                    ['BEDDING (TODAS LAS UNIDADES):', '1 cama matrimonial + 1 sofá cama para 1 persona'],
                                    ['SE HACEN MAT O TWIN:', 'TODOS LOS DEPARTAMENTOS'],
                                ]
                            }
                        ]
                    },
                    desayunos: {
                        title: 'Desayuno Café Registrado',
                        sections: [
                            {
                                name: 'Datos del Proveedor',
                                data: [
                                    ['Detalle', 'Información'],
                                    ['Nombre', 'Café Registrado, suc. Plaza Güemes'],
                                    ['Web', '<a href="https://www.caferegistrado.com" target="_blank">www.caferegistrado.com</a>'],
                                    ['Dirección', 'Av. Medrano 1881 (a 200 metros de Milenia Vidt, en Palermo Soho)'],
                                    ['Contacto Comercial', 'Fernanda Pérez – 11 3041 2891'],
                                    ['Contacto Operativo', '<a href="mailto:plazaguemes@caferegistrado.com">plazaguemes@caferegistrado.com</a>'],
                                    ['Horario', 'Todos los días de 8 a 20 hs. Abre los feriados.'],
                                    ['Guarda equipaje', 'No presta este servicio.']
                                ]
                            },
                            {
                                name: 'Procedimiento Operativo',
                                data: [
                                    ['Detalle'],
                                    [`<div style="line-height:1.65; max-width:900px;">
                                        <p style="margin-top:0;">Operación <strong>igual que el resto de las cafeterías</strong> con convenio de desayuno:</p>
                                        <ol style="margin:0.75em 0 0 1.25em; padding:0;">
                                            <li style="margin-bottom:0.75em;">Entre las <strong>7:00 y las 7:30 hs</strong>, enviar por mail a la operación de la cafetería (<a href="mailto:plazaguemes@caferegistrado.com">plazaguemes@caferegistrado.com</a>) el <strong>listado de huéspedes</strong> que desayunan ese día.</li>
                                            <li style="margin-bottom:0.75em;">El listado debe incluir <strong>solo el nombre</strong> del huésped. <strong>No</strong> incluir el número de reserva.</li>
                                            <li style="margin-bottom:0.75em;">En el local, la cafetería solicitará al huésped el <strong>código de reserva iPPA</strong>. Si el huésped entrega por error el código de la OTA, no hay inconveniente.</li>
                                            <li style="margin-bottom:0.75em;">La cafetería presentará <strong>quincenalmente</strong> la <strong>Liquidación de Desayunos</strong> efectivamente consumidos, con: fecha, nombre, código de reserva y opción de desayuno consumida.</li>
                                        </ol>
                                    </div>`]
                                ]
                            },
                            {
                                name: 'Menú de Desayuno Continental',
                                data: [
                                    ['Detalle', 'Información'],
                                    ['Tipo', 'Desayuno continental (consta de tres componentes). El huésped elige una de las siguientes opciones:'],
                                    ['Opción 1', 'Café o infusión mediana a elección, dos medialunas y un jugo chico de naranja'],
                                    ['Opción 2', 'Café o infusión mediana a elección, tostadas con dip de mermelada y queso crema'],
                                    ['Opción 3', 'Café o infusión mediana a elección, yogurt chico y plato de frutas'],
                                    ['Extras', 'Cualquier cosa extra que el pasajero requiera puede solicitarla directamente en el local.']
                                ]
                            }
                        ]
                    },
                    bankData: {
                        title: 'Datos Bancarios',
                        sections: [
                            {
                                name: 'Información de Cuenta (ARS)',
                                data: [
                                    ['Concepto', 'Detalle'],
                                    ['Razón Social', 'FIDEICOMISO STAY HOME FIDEICOM'],
                                    ['Cuit', '30718528018'],
                                    ['Tipo y número de cuenta corriente en pesos', '429-025036/8'],
                                    ['CBU', '0720429020000002503686'],
                                    ['Alias', 'ANALOGIA.MISA.REBAJO'],
                                ]
                            }
                        ]
                    }
                }
            },
            reservas: {
                            name: 'Reservas',
                            subsections: {
                                links: {
                                    title: 'Links y contraseñas',
                                    sections: [
                                        {
                                            name: 'Información General',
                                            data: [
                                                ['Nombre', 'Link', 'Usuario', 'Contraseña'],
                                                ['Mail Reservas', '-', 'reservas@ippa-hoteles.com', 'IPHoteles2024$'],
                                                ['We Speak', '<a href="https://app.wespeak.pro/dashboard" target="_blank">Acceder</a>', 'host@ippa-hoteles.com', 'Pide confirmación por mail'],
                                            ]
                                        }
                                    ]
                                }
                            }
                        }
                    };
                    

                    
const LAST_UPDATE = { date: '2026-05-22', owner: 'Nahuel Zacarias' };
let currentHotelId = null;
let currentSubsectionId = null;
let copyToastTimer = null;
let activeHighlightQuery = '';
let highlightMatches = [];
let activeHighlightIndex = -1;

function setLastUpdate() {
    const node = document.getElementById('last-update');
    if (!node) return;
    node.textContent = `Ultima actualizacion: ${LAST_UPDATE.date} - Responsable: ${LAST_UPDATE.owner}`;
}

function expandAllHotels() {
    document.querySelectorAll('.hotel-subsections').forEach((node) => node.classList.add('show'));
    document.querySelectorAll('.arrow').forEach((node) => node.classList.add('expanded'));
}

function collapseAllHotels() {
    document.querySelectorAll('.hotel-subsections').forEach((node) => node.classList.remove('show'));
    document.querySelectorAll('.arrow').forEach((node) => node.classList.remove('expanded'));
}

function showCopyToast(message = 'Copiado') {
    const toast = document.getElementById('copy-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    if (copyToastTimer) clearTimeout(copyToastTimer);
    copyToastTimer = setTimeout(() => toast.classList.remove('show'), 1300);
}

async function copyCellValue(rawValue) {
    try {
        await navigator.clipboard.writeText(rawValue);
        showCopyToast('Copiado');
    } catch (err) {
        showCopyToast('No se pudo copiar');
    }
}

function getPlainCellValue(htmlValue) {
    const holder = document.createElement('div');
    holder.innerHTML = htmlValue;
    const anchor = holder.querySelector('a');
    if (anchor?.href) return anchor.href;
    return holder.textContent.trim();
}

function shouldAddCopyButton(headers, cellHtml, colIndex, rowIndex) {
    if (rowIndex === 0) return false;
    const header = (headers[colIndex] || '').toLowerCase();
    const hasAnchor = /<a\s/i.test(cellHtml);
    return hasAnchor || header.includes('usuario') || header.includes('contraseña') || header.includes('link');
}

function formatBankSectionAsText(section) {
    const rows = (section.data || []).slice(1);
    if (!rows.length) return '';
    const pairs = rows.map((row) => {
        const label = getPlainCellValue(String(row[0] || ''));
        const value = row
            .slice(1)
            .map((cell) => getPlainCellValue(String(cell || '')))
            .join(' | ')
            .trim();
        return [label, value];
    });
    const maxLabelLength = pairs.reduce((max, [label]) => Math.max(max, label.length), 0);
    return pairs
        .map(([label, value]) => `${label.padEnd(maxLabelLength, ' ')} : ${value}`)
        .join('\n');
}

function renderBankDataSection(section, tableContainer) {
    const wrapper = document.createElement('div');
    wrapper.className = 'bank-copy-wrapper';

    const textBlock = formatBankSectionAsText(section);

    const pre = document.createElement('pre');
    pre.className = 'bank-copy-block';
    pre.textContent = textBlock;

    const copyButton = document.createElement('button');
    copyButton.className = 'copy-btn bank-copy-btn';
    copyButton.type = 'button';
    copyButton.textContent = 'Copiar todos los datos bancarios';
    copyButton.addEventListener('click', () => copyCellValue(textBlock));

    wrapper.appendChild(pre);
    wrapper.appendChild(copyButton);
    tableContainer.appendChild(wrapper);

    if (activeHighlightQuery) {
        applyTextHighlight(wrapper, activeHighlightQuery);
    }
}

function renderAlarmaCodesSection(section, tableContainer) {
    const codes = section.codes || [];
    const allText = codes.map(([depto, codigo]) => `${depto}\t${codigo}`).join('\n');

    const toolbar = document.createElement('div');
    toolbar.className = 'alarm-codes-toolbar';
    const copyAllBtn = document.createElement('button');
    copyAllBtn.className = 'copy-btn bank-copy-btn';
    copyAllBtn.type = 'button';
    copyAllBtn.textContent = 'Copiar todos los códigos';
    copyAllBtn.addEventListener('click', () => copyCellValue(allText));
    toolbar.appendChild(copyAllBtn);
    tableContainer.appendChild(toolbar);

    const splitIndex = Math.ceil(codes.length / 2);
    const columns = [codes.slice(0, splitIndex), codes.slice(splitIndex)];

    const gridWrapper = document.createElement('div');
    gridWrapper.className = 'alarm-codes-columns';

    columns.forEach((columnCodes) => {
        const table = document.createElement('table');
        table.className = 'alarm-codes-table';
        table.innerHTML = `
            <thead><tr><th>Depto</th><th>Código</th><th></th></tr></thead>
            <tbody></tbody>
        `;
        const tbody = table.querySelector('tbody');
        columnCodes.forEach(([depto, codigo]) => {
            const tr = document.createElement('tr');
            const deptoTd = document.createElement('td');
            deptoTd.className = 'alarm-depto';
            deptoTd.textContent = depto;
            const codigoTd = document.createElement('td');
            codigoTd.className = 'alarm-codigo';
            codigoTd.textContent = codigo;
            const actionTd = document.createElement('td');
            actionTd.className = 'alarm-copy-cell';
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.type = 'button';
            copyBtn.textContent = 'Copiar';
            copyBtn.addEventListener('click', () => copyCellValue(codigo));
            actionTd.appendChild(copyBtn);
            tr.appendChild(deptoTd);
            tr.appendChild(codigoTd);
            tr.appendChild(actionTd);
            tbody.appendChild(tr);
        });
        const colWrap = document.createElement('div');
        colWrap.className = 'alarm-codes-column';
        colWrap.appendChild(table);
        gridWrapper.appendChild(colWrap);
    });

    tableContainer.appendChild(gridWrapper);
    if (activeHighlightQuery) {
        applyTextHighlight(gridWrapper, activeHighlightQuery);
    }
}

function renderMileniaMappingSection(section, tableContainer) {
    const legend = document.createElement('div');
    legend.className = 'mapping-legend';
    legend.innerHTML = `
        <span class="mapping-legend-item"><span class="mapping-legend-dot is-ours"></span>iPPA</span>
        <span class="mapping-legend-item"><span class="mapping-legend-dot is-external"></span>No Pertenece</span>
    `;
    tableContainer.appendChild(legend);

    const wrapper = document.createElement('div');
    wrapper.className = 'mapping-grid-wrapper';
    const leftColumn = document.createElement('div');
    leftColumn.className = 'mapping-grid-column';
    const rightColumn = document.createElement('div');
    rightColumn.className = 'mapping-grid-column';

    const floors = section.floors || [];
    const splitIndex = Math.ceil(floors.length / 2);

    floors.forEach((floor, floorIndex) => {
        const card = document.createElement('div');
        card.className = 'mapping-floor-card';
        card.style.setProperty('--floor-index', String(floorIndex));

        const title = document.createElement('div');
        title.className = 'mapping-floor-title';
        title.textContent = floor.floorLabel;
        card.appendChild(title);

        const labels = document.createElement('div');
        labels.className = 'mapping-row-labels';
        labels.innerHTML = '<span>Frente</span><span>Contra Frente</span>';
        card.appendChild(labels);

        const grid = document.createElement('div');
        grid.className = 'mapping-floor-grid';

        ['A', 'B', 'C', 'D'].forEach((slot) => {
            const room = floor.rooms?.[slot] || null;
            const isOurs = Boolean(room?.isOurs);
            const cell = document.createElement('div');
            cell.className = `mapping-room-cell ${isOurs ? 'is-ours' : 'is-external'}`;
            if (isOurs && room?.unit) {
                cell.textContent = room.unit;
            }
            const balconyText = room?.hasBalcony === false ? 'No' : 'Si';
            cell.setAttribute(
                'data-tooltip',
                isOurs
                    ? `Unidad: ${room.unit} · Tipo: ${room.type} · Ubicacion: ${room.location} · Balcon: ${balconyText} · Hotel: iPPA`
                    : 'Hotel: No Pertenece'
            );
            grid.appendChild(cell);
        });

        card.appendChild(grid);
        if (floorIndex < splitIndex) {
            leftColumn.appendChild(card);
        } else {
            rightColumn.appendChild(card);
        }
    });

    wrapper.appendChild(leftColumn);
    wrapper.appendChild(rightColumn);
    tableContainer.appendChild(wrapper);
}

function runGlobalSearch() {
    const query = (document.getElementById('global-search')?.value || '').trim().toLowerCase();
    if (!query) return;
    const matches = [];
    Object.entries(hotelsData).forEach(([hotelId, hotel]) => {
        Object.entries(hotel.subsections || {}).forEach(([subsectionId, subsection]) => {
            (subsection.sections || []).forEach((section) => {
                (section.data || []).slice(1).forEach((row) => {
                    const combined = row.map((cell) => String(cell).toLowerCase()).join(' ');
                    if (combined.includes(query)) {
                        matches.push({
                            hotelId,
                            subsectionId,
                            hotelName: hotel.name,
                            subsectionTitle: subsection.title,
                            sectionName: section.name,
                            row
                        });
                    }
                });
            });
        });
    });
    renderSearchResults(matches, query);
}

function clearGlobalSearch() {
    const input = document.getElementById('global-search');
    if (input) input.value = '';
    activeHighlightQuery = '';
    highlightMatches = [];
    activeHighlightIndex = -1;
}

function renderSearchResults(results, query) {
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';
    document.getElementById('hotel-title').textContent = 'Busqueda global';
    document.getElementById('subsection-title').textContent = `Resultados para "${query}"`;
    const wrapper = document.createElement('div');
    wrapper.className = 'table-container';
    const table = document.createElement('table');
    table.innerHTML = `
      <thead><tr><th>Hotel</th><th>Seccion</th><th>Detalle</th><th>Accion</th></tr></thead>
      <tbody>
      ${results.map((item, idx) => `
        <tr>
          <td data-label="Hotel">${item.hotelName}</td>
          <td data-label="Seccion">${item.subsectionTitle}</td>
          <td data-label="Detalle">${item.sectionName}</td>
          <td data-label="Accion"><button class="copy-btn" onclick="openSearchResult(${idx})">Abrir</button></td>
        </tr>
      `).join('') || '<tr><td colspan="4">Sin resultados</td></tr>'}
      </tbody>`;
    wrapper.appendChild(table);
    tableContainer.appendChild(wrapper);
    window.latestSearchResults = results;
    document.getElementById('empty-state').classList.add('hidden');
    document.getElementById('content').classList.remove('hidden');
}

function openSearchResult(index) {
    const item = window.latestSearchResults?.[index];
    if (!item) return;
    activeHighlightQuery = (document.getElementById('global-search')?.value || '').trim();
    showSubsection(item.hotelId, item.subsectionId);
}

function applyTextHighlight(rootElement, query) {
    if (!query) return;
    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${safeQuery})`, 'ig');
    const walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (!node.nodeValue || !node.nodeValue.trim()) continue;
        if (node.parentElement && ['SCRIPT', 'STYLE', 'MARK'].includes(node.parentElement.tagName)) continue;
        textNodes.push(node);
    }
    textNodes.forEach((textNode) => {
        if (!regex.test(textNode.nodeValue)) return;
        regex.lastIndex = 0;
        const fragment = document.createDocumentFragment();
        const parts = textNode.nodeValue.split(regex);
        parts.forEach((part) => {
            if (!part) return;
            if (part.toLowerCase() === query.toLowerCase()) {
                const mark = document.createElement('mark');
                mark.className = 'search-highlight';
                mark.textContent = part;
                fragment.appendChild(mark);
            } else {
                fragment.appendChild(document.createTextNode(part));
            }
        });
        textNode.replaceWith(fragment);
    });
}

function refreshHighlightMatches() {
    highlightMatches = Array.from(document.querySelectorAll('.search-highlight'));
    if (!highlightMatches.length) {
        activeHighlightIndex = -1;
        return;
    }
    activeHighlightIndex = 0;
    setActiveHighlight();
}

function setActiveHighlight() {
    highlightMatches.forEach((node) => node.classList.remove('search-highlight-active'));
    if (activeHighlightIndex < 0 || activeHighlightIndex >= highlightMatches.length) return;
    const target = highlightMatches[activeHighlightIndex];
    target.classList.add('search-highlight-active');
    target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
}

function nextHighlightMatch() {
    if (!highlightMatches.length) {
        showCopyToast('No hay coincidencias abiertas');
        return;
    }
    activeHighlightIndex = (activeHighlightIndex + 1) % highlightMatches.length;
    setActiveHighlight();
}

function prevHighlightMatch() {
    if (!highlightMatches.length) {
        showCopyToast('No hay coincidencias abiertas');
        return;
    }
    activeHighlightIndex = (activeHighlightIndex - 1 + highlightMatches.length) % highlightMatches.length;
    setActiveHighlight();
}

                    function toggleHotel(hotelId) {
    const subsections = document.getElementById(`subsections-${hotelId}`);
    const arrow = document.getElementById(`arrow-${hotelId}`);
    subsections.classList.toggle('show');
    arrow.classList.toggle('expanded');
}

function showSubsection(hotelId, subsectionId) {
    const hotel = hotelsData[hotelId];
    const subsection = hotel.subsections[subsectionId];
    currentHotelId = hotelId;
    currentSubsectionId = subsectionId;

    document.getElementById('hotel-title').textContent = hotel.name;
    document.getElementById('subsection-title').textContent = subsection.title;

    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';

    const isMileniaMappingSubsection = hotelId === 'milenia' && subsectionId === 'mapping';
    const isBankDataSubsection = subsectionId === 'bankData';

    // Dibujar las tablas
    subsection.sections.forEach(section => {
        const sectionTitle = document.createElement('div');
        sectionTitle.className = 'section-title';
        sectionTitle.textContent = section.name;
        tableContainer.appendChild(sectionTitle);

        if (isMileniaMappingSubsection) {
            renderMileniaMappingSection(section, tableContainer);
            return;
        }

        if (isBankDataSubsection) {
            renderBankDataSection(section, tableContainer);
            return;
        }

        if (section.customRender === 'alarmaCodes') {
            renderAlarmaCodesSection(section, tableContainer);
            return;
        }

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headers = section.data[0] || [];
        section.data.forEach((row, index) => {
            const tr = document.createElement('tr');
            row.forEach((cell, colIndex) => {
                const element = index === 0 ? document.createElement('th') : document.createElement('td');
                if (index > 0) {
                    element.setAttribute('data-label', headers[colIndex] || '');
                }
                if (index > 0 && shouldAddCopyButton(headers, String(cell), colIndex, index)) {
                    const plainValue = getPlainCellValue(String(cell));
                    const wrapper = document.createElement('div');
                    wrapper.className = 'cell-with-copy';
                    const contentSpan = document.createElement('span');
                    contentSpan.innerHTML = String(cell);
                    const copyButton = document.createElement('button');
                    copyButton.className = 'copy-btn';
                    copyButton.type = 'button';
                    copyButton.textContent = 'Copiar';
                    copyButton.addEventListener('click', () => copyCellValue(plainValue));
                    wrapper.appendChild(contentSpan);
                    wrapper.appendChild(copyButton);
                    element.appendChild(wrapper);
                } else {
                    element.innerHTML = cell;
                }
                tr.appendChild(element);
            });
            if (index === 0) {
                thead.appendChild(tr);
            } else {
                tbody.appendChild(tr);
            }
        });

        table.appendChild(thead);
        table.appendChild(tbody);

        const wrapper = document.createElement('div');
        wrapper.className = 'table-container';
        wrapper.appendChild(table);
        tableContainer.appendChild(wrapper);
        if (activeHighlightQuery) {
            applyTextHighlight(wrapper, activeHighlightQuery);
        }
    });
    if (activeHighlightQuery) {
        refreshHighlightMatches();
    } else {
        highlightMatches = [];
        activeHighlightIndex = -1;
    }

    // --- AQUÍ SE COLOCA EL FOOTER (Botón de descarga) ---
    if (subsection.footer) {
        const footerDiv = document.createElement('div');
        footerDiv.style.marginTop = "20px";
        footerDiv.style.textAlign = "center";
        footerDiv.innerHTML = subsection.footer;
        tableContainer.appendChild(footerDiv);
    }

    // Mostrar el contenido
    document.getElementById('empty-state').classList.add('hidden');
    document.getElementById('content').classList.remove('hidden');
} // <-- Esta llave cierra showSubsection correctamente
function toggleDriveMenu() {
    const dropdown = document.getElementById('driveDropdown');
    const arrow = document.getElementById('drive-arrow');
    const isOpen = dropdown.style.display === 'flex';
    dropdown.style.display = isOpen ? 'none' : 'flex';
    arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
}

setLastUpdate();
