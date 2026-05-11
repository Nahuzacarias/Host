// --- LÓGICA RESPONSIVE NUEVA ---
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            sidebar.classList.toggle('active');
            
            if (sidebar.classList.contains('active')) {
                overlay.style.display = 'block';
            } else {
                overlay.style.display = 'none';
            }
        }

        function closeSidebarOnMobile() {
            // Solo cerrar si estamos en pantalla pequeña
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        }

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
                                    ['TTlock', '<a href="https://lock2.ttlock.com/" target="_blank">TTlock Web</a>', 'asistente.operaciones@ippa-hoteles.com', 'IPHoteles2030!!'],
                                    ['Trello', '<a href="https://id.atlassian.com/login?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback%3Fdisplay%3DeyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%253D%253D&display=eyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%3D%3D" target="_blank">Login Trello</a>', 'host.filiberto@ippa-hoteles.com', 'IPHoteles2024'],
                                    ['Roomcloud Host', '<a href="https://secure.roomcloud.net/be/owners_area/index.jsp" target="_blank">Login RoomCloud</a>', 'Host iPPA', 'IPHoteles2026!'],
                                    ['BookiP', '<a href="https://prd-iph.opti-hospitalitysuite.com/auth/login/login.php" target="_blank">Login BookiP</a>', 'hostippa', 'IPHoteles2024'],
                                    ['Booking', '<a href="https://account.booking.com/sign-in?op_token=EgVvYXV0aCJHChQ2Wjcyb0hPZDM2Tm43emszcGlyaBIJYXV0aG9yaXplGhpodHRwczovL2FkbWluLmJvb2tpbmcuY29tLyoCe31CBGNvZGUqEjCb87nq2-8mOgBCAFjOvJevBg" target="_blank">Login Booking</a>', 'ippahost', 'IPHoteles2025!!'],
                                    ['Expedia', '<a href="https://www.expediapartnercentral.com/Account/Logon?signedOff=true" target="_blank">Login Expedia</a>', 'host@ippa-hoteles.com', 'IPHoteles2025!!'],
                                    ['Airbnb', '-', 'reservas@ippa-hoteles.com', 'IPHoteles2024']
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
                                    ['Despegar', '<a href="https://extranet.despegar.com/extranet-hotels/bkd/hotels/dashboard/6057403" target="_blank">Login Despegar</a>', 'Dana-Croatto', 'IPHoteles2026!!'],
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
                                    ['Wifi', '-', 'P1, P2,P3,P4', 'Costarica4828'],
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
                                    ['Sofá Cama', '-'],
                                    ['Hab al frente', '-'],
                                    ['Hab al contrafrente', '-'],

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
                    },
                    billing: {
                        title: 'Facturación',
                        sections: [
                            {
                                name: 'Datos de Facturación',
                                data: [
                                    ['Concepto', 'Detalle'],
                                    ['Instrucciones', 'Alquiler temporario, igual que todas exceptuando Filiberto']
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
                                name: '1. Ubicación y Entorno',
                                data: [
                                    ['Contenido'],
                                    [`<div style="line-height:1.65; max-width:900px;">
<p><strong>Dirección:</strong> Av. de los Pioneros Km 2, San Carlos de Bariloche, Río Negro.</p>
<p><strong>Entorno:</strong> El complejo está ubicado en un predio de 2 hectáreas de bosque nativo en las faldas del Cerro Otto.</p>
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
                                name: '2. Horarios Clave',
                                data: [
                                    ['Contenido'],
                                    [`<div style="line-height:1.65; max-width:900px;">
<ul style="margin:0; padding-left:1.25em;">
<li><strong>Check-in:</strong> 16:00 hs.</li>
<li><strong>Check-out:</strong> 10:00 hs. (El Late Check Out está sujeto a disponibilidad y tiene un cargo adicional).</li>
<li><strong>Desayuno:</strong> Se sirve de 08:00 a 10:30 hs (o hasta las 11:00 hs según temporada).</li>
<li><strong>Restaurante:</strong> Abierto de 08:00 a 23:30 hs (puede variar según la temporada).</li>
</ul>
</div>`]
                                ]
                            },
                            {
                                name: '3. Servicios e Instalaciones',
                                data: [
                                    ['Contenido'],
                                    [`<div style="line-height:1.65; max-width:900px;">
<p><strong>Conectividad:</strong> Wi-Fi gratuito en áreas comunes y unidades.</p>
<p><strong>Internet Wi-Fi:</strong> Usuario <strong>Andina</strong> / Acceso <strong>Aldea2021</strong>.</p>
<p><strong>Alojamiento:</strong> Cuenta con 34 unidades entre habitaciones de hotel y departamentos equipados (algunos con cocina e hidromasaje).</p>
<p><strong>Gastronomía:</strong> El restaurante "El Bodegón del Lago" ofrece cocina casera con vistas al Lago Nahuel Huapi.</p>
<p><strong>Bienestar (Spa):</strong></p>
<ul style="margin:0.35em 0 0.5em 1.25em;">
<li>Piscina climatizada in-out (interior/exterior).</li>
<li>Jacuzzi y sauna.</li>
<li>Servicios de masajes, quiropraxia y reflexología.</li>
</ul>
<p><strong>Pileta y toallones:</strong> Se provee un toallón por persona para toda la estadía. El recambio de la prenda tiene un costo adicional $1000. La temperatura del agua de la pileta es establecida por la normativa vigente.</p>
<p><strong>Horario de pileta y spa (pileta / instalaciones asociadas):</strong> Lunes a domingo: de 11:00 a 23:00 h. Fuera de ese horario se realiza mantenimiento y limpieza de las mismas por lo que no se podrán utilizar.</p>
<p><strong>Deportes y Recreación:</strong></p>
<ul style="margin:0.35em 0 0.5em 1.25em;">
<li>Cancha de tenis de polvo de ladrillo.</li>
<li>Sala de juegos (ping-pong, metegol).</li>
<li>Quincho/parrilla y fogón para asados.</li>
</ul>
<p><strong>Check-in y vehículos:</strong> Al realizar el check-in deberá informar el número de patente del vehículo. Cada edificio tiene asignado su estacionamiento para un auto. El único estacionamiento exclusivo es para el módulo Abedules. Si necesitara un lugar extra, comuníquese con la recepción.</p>
<p><strong>Estacionamiento:</strong> Gratuito dentro del predio (por orden de llegada). En caso de necesitar un estacionamiento extra, deberá utilizarse el estacionamiento de visita (todo auto de visita deberá usar dicho estacionamiento); de lo contrario se estaría ocupando un lugar ya asignado, ocasionando molestias a un huésped.</p>
</div>`]
                                ]
                            },
                            {
                                name: '4. Datos Técnicos y Normativas',
                                data: [
                                    ['Contenido'],
                                    [`<div style="line-height:1.65; max-width:900px;">
<p><strong>Mascotas:</strong> El establecimiento no admite mascotas.</p>
<p><strong>Días de limpieza:</strong> De lunes a sábados de 9:00 a 16:00 hs. Los domingos no se prestará servicio de housekeeping.</p>
<p><strong>Quincho:</strong> El uso del quincho deberá solicitarse en recepción; tiene costo. La vajilla debe quedar limpia y en su lugar al desocupar el quincho; caso contrario se cargará en cuenta el valor del lavado (11 USD TCV — oficial).</p>
<p><strong>Invitados:</strong> No está permitido el ingreso al establecimiento de invitados o personas que no estén alojadas en el complejo, tanto a las unidades como a los espacios comunes, sin previa autorización de la Administración.</p>
<p><strong>Sostenibilidad:</strong> El hotel cuenta con un programa de compromiso ambiental dentro del Parque Nacional Nahuel Huapi.</p>
</div>`]
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
                                    ['Mail Aldea Andina', '-', 'host.aldeaandina@ippa-hoteles.com', 'Ippa0405'],
                                    ['TTHoteles', '<a href="https://play.google.com/store/apps/details?id=com.sciener.hotela" target="_blank">Descargar app (Android)</a> · <a href="https://apps.apple.com/app/tthotel/id1440266680" target="_blank">Descargar app (iOS)</a>', 'asistente.operaciones@ippa-hoteles.com', 'l0136247'],
                                    ['PMS Venice', '<a href="https://s1.venicepms.com/ala551/admin/login" target="_blank">Login Venice PMS</a>', '-', '-']
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
                                    ['Nota', 'Pendiente de carga.']
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
                                    ['Nota', 'Pendiente de carga.']
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
      billingDespegar: {
            title: 'Facturación Despegar',
            sections: [
                {
                    name: 'Accesos a Carpetas (Drive)',
                    data: [
                        ['Hotel', 'Acceso Directo', 'Ruta en Drive'],
                        ['InSoho', '<a href="https://drive.google.com/drive/folders/1UCuVYL3Y5VmGQZd30otIu-a6gN75lk0y?usp=drive_link" target="_blank">Abrir Carpeta</a>', 'Ippa Hoteles > Clientes > Insoho > Administracion > Ingresos > FC Despegar'],
                        ['Filiberto', '<a href="https://drive.google.com/drive/folders/1jrL52C6D9whk4lYQJk-fAQbp3CZTVAvC?usp=drive_link" target="_blank">Abrir Carpeta</a>', 'Ippa Hoteles > Clientes > Filiberto > Administracion > Ingresos > FC Despegar']
                    ]
                },
                {
                    name: 'Instrucciones y Procedimiento',
                    data: [
                        ['Detalle del Proceso'],
                        [`<div style="line-height: 1.6; ">
                            <p>Las facturas emitidas a Despegar se deben guardar <strong>POR MES</strong> (el criterio es la fecha de Check-In) en las carpetas mencionadas arriba. Esto permite que Administración las cargue en la extranet para gestionar el pago. <strong>A partir de ahora, esta tarea debe ser realizada por el auditor.</strong></p>
                            <p><strong>¿Cómo debemos facturar?</strong><br>
                            Se debe emitir <strong>FACTURA A</strong> a Despegar según el perfil cargado en el sistema. La forma de pago será <strong>Cuenta Corriente</strong>. Al emitir la factura, es fundamental que en el campo <strong>NOTAS</strong> se coloque la palabra "PNR" seguida del número (Ej: PNR 106777167), nunca el número solo.</p>
                            <p><strong>Guardado de archivos:</strong><br>
                            El archivo PDF debe nombrarse con el siguiente formato: <strong>Apellido del huésped + In y Out + PNR</strong>.</p>
                            <div style="margin: 15px 0; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; max-width: 500px;">
                                <img src="Media/despegar.png" alt="Ejemplo de nomenclatura" style="width: 100%; display: block;">
                            </div>
                            <p style="background-color: #fff3f3; padding: 10px; border-left: 4px solid #f44336; color: black;">
                                <strong>Aclaración importante:</strong> A Despegar solo debe facturarse <strong>ALOJAMIENTO</strong>. No se debe facturar el DDU, el cual debe ser abonado por los huéspedes.
                            </p>
                        </div>`]
                    ]
                }
            ]
        }, // <--- Esta coma separa Despegar de Desayunos
        desayunosBaires: {
            title: 'Desayunos Baires Belgrano',
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
        },desayunosMilenia: {
            title: 'Desayunos Milenia Soho by iPPA',
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
        },desayunosHache: {
    title: 'Desayunos Hache Palermo',
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
}
    } // <--- Esta llave cierra "subsections"
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
                ['Caja', , 'Apartamento', 'Contraseña'],
                ['1', 'D','2941'],
                ['2', 'J', '8305'],
                ['3', 'E', '1762' ],
                ['4', 'F', '6493'],
                ['5', 'Extra','4028'],
                ['6', 'Extra', '9517'],
                ['7', 'Extra', '3850' ],
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
                                    ['Despegar', '<a href="https://extranet.despegar.com/extranet-hotels/bkd/hotels/dashboard/6057403" target="_blank">Login Despegar</a>', 'Dana-Croatto', 'IPHoteles2026!!'],
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
                    },
                    
                    billing: {
                        title: 'Facturación',
                        sections: [
                            {
                                name: 'Tipos de Facturación por Origen',
                                data: [
                                    ['Origen', 'Tipo de Pago', 'Tipo de Factura'],
                                    ['Booking.com', 'Visa, Mastercard,Amex,etc', 'Factura A/B'],
                                    ['Despegar', 'Cuenta corriente', 'Factura A'],
                                    ['Airbnb', 'Cuenta corriente', 'Factura A'],
                                    ['Expedia', 'Visa, Mastercard,Amex,etc', 'Factura T/Electrónica T'],
                                    ['Efectivo', 'Factura T', 'Recibo T']
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
                                    ['Link de pago Clover', '<a href="https://www5.ipg-online.com/vt/login" target="_blank">Login Clover</a>', '5930718528018', 'Milenia2026!'],
                                    ['Celular', '-', '-', '1564'],
                                    ['Hipcam', '-', 'host.insoho@ippa-hoteles.com', 'ippahoteles2025'],
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
                    },
                    
                    billing: {
                        title: 'Facturación',
                        sections: [
                            {
                                name: 'Tipos de Facturación por Origen',
                                data: [
                                    ['Origen', 'Tipo de Pago', 'Tipo de Factura'],
                                    ['Booking.com', 'Visa, Mastercard,Amex,etc', 'Factura A/B'],
                                    ['Despegar', 'Cuenta corriente', 'Factura A'],
                                    ['Airbnb', 'Cuenta corriente', 'Factura A'],
                                    ['Expedia', 'Visa, Mastercard,Amex,etc', 'Factura T/Recibo T'],
                                    ['Efectivo', 'No aplica']
                                ]
                            }
                        ]
                    }
                }
            },
                                     bah: {
                            name: 'BAH Congreso By iPPA',
                            subsections: {
                                links: {
                                    title: 'Links y contraseñas',
                                    sections: [
                                        {
                                            name: 'Información General',
                                            data: [
                                                ['Nombre', 'Link', 'Usuario', 'Contraseña'],
                                                ['Mail','-', 'Host.bahcongreso@ippa-hoteles.com ', 'IPP4HOTELES475#'],
                                    
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
                                                ['Bedding,equipamiento y vista', '', '', 'Número'],
                                                ['SE HACEN TWIN Y MAT', '', '', 'Todas'],
                                               
                                                ['HABS SIN LAVAROPAS', '', '', '1G , 1M Y 2M'],
                                                ['HABS CON VISTA A LA CALLE', '', '', '1A , 7B'],
                                                ['HABS CON VISTA AL PATIO', '', '', '1G,1M Y 2M'],
                                                ['SIN VISTA, TIENE UN PATIECITO', '', '', '3H, 5G, 9D'],
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
                                                ['CBU', '0070677920000001636839'],
                                                ['Banco', 'Galicia'],
                                            ]
                                        }
                                    ]
                                },
                                billing: {
                                    title: 'Facturación',
                                    sections: [
                                        {
                                            name: 'Tipos de Facturación',
                                            data:  [                              
                                                ['Origen', 'Tipo de Factura'],
                                                ['Sin información', 'Sin información'],
                                            ]
                                        }
                                    ]
                                },
                                accesos: { // Nuevo bloque accesos
                                    title: 'Accesos',
                                    sections: [
                                        {
                                            name: 'Códigos y Permisos',
                                            data: [
                                                ['Piso', 'Depto', 'Clave Cerradura', 'Software', 'Caja', 'Clave Caja', 'Tipo de Cerradura'],
                ['1', 'A', '112233#', 'Chino', '9', '1989', 'Negra'],
                ['1', 'M', '223344#', 'Chino', '15', '1995', 'Negra'],
                ['1', 'G', '223344#', 'Chino', '7', '1987', 'Negra'],
                ['2', 'M', '445566#', 'Chino', '17', '1997', 'Negra'],
                ['5', 'G', '6431#', 'TTLOCK', '12', '1992', 'Gris'],
                ['9', 'D', '262689#', 'TTLOCK', '10', '1990', 'Gris']
                                            ]
                                        }
                                    ]
                                }
                            }
                        },reservas: {
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
                    

                    
const LAST_UPDATE = { date: '2026-04-26', owner: 'Nahuel Zacarias' };
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
          <td>${item.hotelName}</td>
          <td>${item.subsectionTitle}</td>
          <td>${item.sectionName}</td>
          <td><button class="copy-btn" onclick="openSearchResult(${idx})">Abrir</button></td>
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

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headers = section.data[0] || [];
        section.data.forEach((row, index) => {
            const tr = document.createElement('tr');
            row.forEach((cell, colIndex) => {
                const element = index === 0 ? document.createElement('th') : document.createElement('td');
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
