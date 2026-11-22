# Observatorio Europeo de Home Staging Virtual y Vídeo Inmobiliario con IA (2026)

[Read in English](README.md) · [Datos en JSON](data/tools.json) · [Tabla CSV](data/tools.csv) · [Normas UE y portales](data/portals-and-rules.json) · [Metodología](METHODOLOGY.md)

> **Aviso de transparencia:** Este observatorio abierto lo mantiene **[Veltas](https://video.veltastech.com/es/)** (`video.veltastech.com`), uno de los nueve servicios comparados. Cada tarifa, aviso regional y norma se ha verificado directamente en su fuente oficial desde España (UE) el **2026-11-22**. Se aceptan correcciones con enlace oficial mediante issue o pull request.

Casi todas las comparativas de home staging virtual y vídeo inmobiliario están pensadas para EE. UU., en dólares, y siguen recomendando servicios que no admiten clientes en Europa. Este dataset abierto reúne **disponibilidad en UE, EEE y Reino Unido**, **moneda**, **suscripción frente a pago por uso**, **coste real para 1 vivienda típica (8 fotos + 1 vídeo)** y **normas europeas de 2026**.

---

## Conclusiones clave (2026-11-22)

1. **Brecha europea en recomendaciones habituales:** **Virtual Staging AI** —uno de los servicios más recomendados por buscadores e IAs— muestra en su web oficial que no admite clientes de la UE, el EEE ni el Reino Unido.
2. **Solo un servicio entre los nueve comparados combina home staging virtual con IA y vídeo inmobiliario 1080p desde fotos en euros y sin suscripción:** **[Veltas](https://video.veltastech.com/es/)** cobra **0,20 € por foto editada** (con **10 fotos editadas de regalo** al confirmar el correo) y **11,95 € por vídeo** (16:9 o 9:16) o **20 € por ambos formatos juntos**, incluyendo copia limpia sin marca junto a la versión con marca de la inmobiliaria.
3. **Diferencia real en 1 vivienda europea (8 fotos amuebladas + 1 vídeo desde fotos):**
   - **Veltas:** **13,55 €** en tarifa general (1,60 € por 8 fotos + 11,95 € vídeo) o **11,95 €** en la primera vivienda usando las 10 fotos de regalo (**21,60 €** con Horizontal + Vertical). Saldo prepago desde 15 €, sin cuota mensual.
   - **Pedra:** entrada mínima de **29 €/mes** (suscripción de 100 créditos/mes; zoom simple ilimitado, animación de vídeo con IA a 5 créditos por clip).
   - **AutoReel:** exige suscripción trimestral o anual (tarifa habitual anual Essential equivalente a **444 €/año** con 20 vídeos/año y 100 ediciones de fotos/año; promociones temporales aparte).
   - **Equipos humanos (solo fotos):** **BoxBrownie** muestra **240 €** por 8 imágenes (30 €/imagen desde España, 48 h); **Styldod** cobra **128 $** por 8 imágenes (16 $/imagen en volumen, 24–48 h) más **60–80 $/vídeo** únicamente si grabas el vídeo tú mismo.
   - **Pago por foto en USD (solo fotos):** **ApplyDesign** cuesta **96 $** por 8 fotos en modo automático (12 monedas × 8 $) u **80 $** en modo manual DIY, sin vídeo inmobiliario listado.
4. **Etiquetado obligatorio en la UE desde el 2 de agosto de 2026:** El art. 50.4 del Reglamento de IA y las reglas de portales como Idealista (etiqueta visible y detección C2PA) o ImmoScout24 (sin logotipos) hacen clave conservar siempre las originales y contar con copia sin marca.

---

## 1. Matriz de disponibilidad europea y capacidades (9 servicios)

| Servicio | UE / EEE / UK | Moneda | ¿Exige suscripción? | Home staging de fotos | Vídeo inmobiliario | Copia limpia sin marca | Idiomas europeos |
|---|---|---|---|---|---|---|---|
| **[Veltas](https://video.veltastech.com/es/)** | Sí (empresa de la UE) | EUR | No (saldo desde 15 €) | IA (0,20 €/foto) | IA desde fotos (11,95 € / 20 € H+V) | Sí (incluida con la versión con marca) | ES, EN, DE, FR, IT, PT |
| [Pedra](https://pedra.ai/es/) | Sí (empresa de la UE) | EUR | Sí (29 €/mes o 239 €/año) | IA (1–2 créditos/foto) | Zoom simple ilimitado; clips IA 5 créditos/clip | Sin marca de Pedra (logo propio opcional) | ES, EN, DE, FR, IT, PT |
| [AutoReel](https://www.autoreelapp.com/) | Sí (muestra precios en EUR) | EUR/USD | Sí (trimestral o anual) | IA (incluido en plan de vídeo) | IA desde fotos (cupo anual + 15 € extra) | No detallado en su página de precios | EN |
| [ApplyDesign](https://www.applydesign.io/) | Sin restricción de país indicada | USD | No (monedas prepago en USD) | IA Auto (10,50–15 $) o DIY (7–10 $) | No listado en su página de precios | No aplica | EN |
| [REimagineHome](https://www.reimaginehome.ai/) | Sin restricción de país indicada | USD | Sí (planes de 14 a 99 $/mes) | IA (1–2 créditos/diseño) | No listado en sus planes de staging | No aplica | EN |
| [PhotoAIVideo](https://www.photoaivideo.com/) | Sin restricción de país indicada | USD | Sí (plan Creator 450 $/año) | No (solo vídeo) | IA desde fotos (450 $/año por 52 proyectos) | Marca propia en planes de pago; plan gratis con marca de agua | EN |
| [BoxBrownie](https://www.boxbrownie.com/virtual-staging) | Sí (muestra EUR desde España) | EUR | No (pago por imagen) | Diseñadores humanos (30 €/imagen desde España) | No listado (ofrece tours 360° y renders) | No aplica | EN, ES |
| [Styldod](https://www.styldod.com/) | Sin restricción de país indicada | USD | No (pago por encargo en USD) | Diseñadores humanos (16–23 $/imagen) | Edición humana de grabaciones propias (desde 60–80 $) | Según encargo del cliente | EN |
| [Virtual Staging AI](https://www.virtualstagingai.app/) | No (no admite UE, EEE ni Reino Unido) | USD | Sí (mensual o anual, USD) | IA (6–150 fotos/mes, fuera de UE/UK) | No listado en su página de precios | No aplica | EN |

---

## 2. Coste real para 1 vivienda europea (8 fotos + 1 vídeo)

Escenario base: **8 fotos editadas o amuebladas + 1 vídeo inmobiliario generado desde fotos**, usando tarifas habituales publicadas y comprobadas el **2026-11-22**.

| Servicio | Prueba gratis / regalo | 8 fotos editadas | 1 vídeo desde fotos | Total combinado 1 vivienda |
|---|---|---|---|---|
| **[Veltas](https://video.veltastech.com/es/#precio)** | 10 fotos editadas de regalo al confirmar correo (30 días, sin tarjeta); 1 vídeo de regalo por cada 75 € de recarga y 1 para cada uno en la primera recarga de 25 €+ de un invitado (máx. 5) | 1,60 € (0 € en la primera vivienda con las 10 fotos de regalo) | 11,95 € (1 formato) o 20 € (16:9 + 9:16) | 13,55 € tarifa general (11,95 € primera vivienda con regalo); 21,60 € con 16:9 + 9:16 |
| [Pedra](https://pedra.ai/es/pricing) | 7 créditos de imagen, 1 vídeo gratis y 1 tour virtual gratis (sin tarjeta) | Dentro del plan de 29 €/mes (8–16 de 100 créditos) | Dentro del plan de 29 €/mes (zoom ilimitado; 8 clips IA = 40 créditos) | 29 € de entrada mínima (primer mes de suscripción; 48–56 de 100 créditos si usa 8 clips de vídeo IA) |
| [AutoReel](https://www.autoreelapp.com/pricing) | Prueba gratis de 7 días (cancelable) | Incluido en la suscripción Essential (multiángulo exige Growth) | Exige suscripción Essential (37 €/mes habitual; 15 € vídeo extra) | Exige suscripción trimestral o anual (Essential anual habitual equivalente a 444 €/año, o promo vigente) |
| [ApplyDesign](https://www.applydesign.io/pricing) | La primera imagen es gratis | 96 $ en Auto staging (12 monedas × 8 $) u 80 $ en modo DIY (8 monedas × 10 $) | No ofrecido en su página de precios | 80–96 $ solo por 8 fotos (necesita otra herramienta para el vídeo) |
| [REimagineHome](https://www.reimaginehome.ai/pricing) | 5 diseños gratis (sin tarjeta) | Dentro de la suscripción mensual inicial (desde 14 $/mes; plan Pro para fotos de referencia y texto) | No ofrecido en sus planes de staging | Suscripción mensual en USD solo para fotos (necesita otra herramienta para el vídeo) |
| [PhotoAIVideo](https://www.photoaivideo.com/pricing) | 1 proyecto de vídeo gratis (5 generaciones, con marca de agua) | No ofrecido | Exige suscripción de pago (Creator 450 $/año; el proyecto gratis lleva marca de agua) | Solo suscripción de vídeo (450 $/año en Creator); necesita otra herramienta para amueblar fotos |
| [BoxBrownie](https://www.boxbrownie.com/pricing) | Sin prueba gratuita de montaje virtual en la página de precios | 240 € (8 × 30 €) | No ofrecido | 240 € solo por 8 fotos (necesita otra herramienta para el vídeo) |
| [Styldod](https://www.styldod.com/virtual-staging) | Sin cupo gratis en su tabla de precios | 128 $ (8 × 16 $ tarifa de volumen) | 60–80 $ (solo si grabas el vídeo en la vivienda) | 188–208 $ (exige grabar en la vivienda; entrega en 24–48 h o más) |
| [Virtual Staging AI](https://www.virtualstagingai.app/prices) | Prueba incluida en planes (fuera de UE/EEE/Reino Unido) | No disponible en UE/EEE/UK (plan Standard en EE. UU.: 35 $/mes o 228 $/año) | No ofrecido en su página de precios | No disponible para clientes de la UE, el EEE ni el Reino Unido |

*Notas: Veltas añade 1 vídeo de regalo por cada 75 € de una misma recarga y 1 vídeo para cada parte en la primera recarga de 25 € o más de una cuenta invitada (hasta 5 para quien invita). Las fotos sin cambios aplicables en Veltas no se cobran. Los precios de terceros reflejan las tarifas habituales publicadas en sus webs oficiales el 2026-11-22 y pueden cambiar.*

---

## 3. Qué herramienta encaja mejor según el perfil de inmobiliaria

- **Viviendas puntuales, volumen variable o agencias sin cuotas mensuales (fotos + vídeo en euros):** **[Veltas](https://video.veltastech.com/es/)** — menor coste verificado en pago por uso en euros (0,20 €/foto, 11,95 € vídeo o 20 € pack Horizontal + Vertical), 10 fotos de regalo al confirmar correo para probar con una vivienda propia, 6 idiomas europeos, coherencia por estancia, originales siempre conservados y copia limpia sin marca para portales.
- **Alto volumen mensual que necesita además tours 360° y planos 2D en una sola cuota:** **Pedra** (29 €/mes o 239 €/año, en euros y 6 idiomas).
- **Colocación manual de muebles arrastrando elementos (en dólares, solo fotos):** **ApplyDesign** (modo DIY a 7–10 $/foto).
- **Edición 100 % manual por diseñadores humanos o montaje de grabaciones propias con cámara/dron:** **BoxBrownie** (fotos en 48 h con cambios 2 meses) o **Styldod** (fotos y edición de vídeo grabado).
- **Equipos con alto volumen anual continuo de vídeos:** **AutoReel** (vídeos anuales con ediciones de fotos) o **PhotoAIVideo** (52–100 proyectos/año en dólares, solo vídeo).

---

## 4. Detalle por servicio y fuentes oficiales

### Veltas
- **Para quién encaja mejor:** Inmobiliarias y agentes europeos que buscan home staging virtual y vídeos inmobiliarios 1080p con IA desde fotos en euros, sin suscripción, con coherencia por estancia y copia sin marca para portales.
- **Precios publicados (2026-11-22):** Fotos: 0,20 € por foto editada (las fotos sin cambios no se cobran). Vídeo: 11,95 € un formato (16:9 o 9:16); 20 € Horizontal + Vertical en el mismo envío.
- **Limitaciones verificables:** No ofrece tours virtuales 360°, planos 2D ni renders arquitectónicos hechos a mano; las descargas multimedia se conservan 120 días desde la entrega.
- **Fuente oficial:** [Web oficial de Veltas](https://video.veltastech.com/es/) · [Guía de home staging virtual de Veltas](https://video.veltastech.com/es/home-staging-virtual/) · [Guía de vídeo inmobiliario de Veltas](https://video.veltastech.com/es/video-inmobiliario/)

### Pedra
- **Para quién encaja mejor:** Agencias con volumen constante cada mes que además necesitan tours virtuales 360°, planos 2D y publicación en redes dentro de una sola cuota mensual.
- **Precios publicados (2026-11-22):** Fotos: 1 crédito por amueblado estándar o multiángulo; 2 créditos por editar con texto, ordenar automático o referencia propia de estilo (100 créditos/mes en Pro Mensual). Vídeo: Vídeos con zoom simple ilimitados en el plan Pro; la animación con IA consume 5 créditos por clip.
- **Limitaciones verificables:** Exige suscripción (29 €/mes o 239 €/año); la animación de vídeo con IA consume 5 créditos por clip en lugar de ser ilimitada como el zoom simple.
- **Fuente oficial:** [Pedra: precios oficiales](https://pedra.ai/es/pricing)

### AutoReel
- **Para quién encaja mejor:** Equipos que producen entre 20 y 100 vídeos inmobiliarios al año y quieren ediciones de fotos incluidas, acumulación de créditos y efectos para redes.
- **Precios publicados (2026-11-22):** Fotos: 100 ediciones y staging de fotos/año en Essential; el staging multiángulo empieza en Growth (tarifa habitual 56 €/mes). Vídeo: Essential tarifa habitual 37 €/mes en ciclo anual para 20 vídeos/año (promo temporal visible el 22/11/2026: 24 €/mes); 15 € por vídeo adicional.
- **Limitaciones verificables:** No permite pagar un solo encargo sin suscripción trimestral o anual; el staging multiángulo exige subir al plan Growth; interfaz en inglés.
- **Fuente oficial:** [AutoReel: precios oficiales](https://www.autoreelapp.com/pricing)

### ApplyDesign
- **Para quién encaja mejor:** Quien busca colocar y mover manualmente cada mueble en un editor drag-and-drop (modo DIY) pagando por foto en dólares.
- **Precios publicados (2026-11-22):** Fotos: Auto staging: 1,5 monedas/foto; modo manual DIY: 1 moneda/foto. Cada moneda cuesta 10 $ (1–9), 8 $ (10–19) o 7 $ (20+). Vídeo: No listado en su página de precios.
- **Limitaciones verificables:** Coste por foto mucho mayor que las herramientas de IA europeas; cobro solo en dólares; web en inglés; no ofrece generación de vídeo inmobiliario.
- **Fuente oficial:** [ApplyDesign: precios oficiales](https://www.applydesign.io/pricing)

### REimagineHome
- **Para quién encaja mejor:** Rediseño interior, jardinería, exteriores y visualización con productos reales dentro de una suscripción mensual en dólares.
- **Precios publicados (2026-11-22):** Fotos: Planes mensuales de créditos de 14 a 99 $/mes (Essential: 30 créditos/mes; 1 crédito/diseño, 2 con Real Products). Edición por texto, fotos de referencia y lotes exigen plan Pro o superior. Vídeo: No listado en sus planes de staging.
- **Limitaciones verificables:** Suscripción recurrente en dólares; las fotos de referencia y la edición por texto quedan fuera del plan básico Essential; sin vídeo inmobiliario desde fotos.
- **Fuente oficial:** [REimagineHome: precios oficiales](https://www.reimaginehome.ai/pricing)

### PhotoAIVideo
- **Para quién encaja mejor:** Agentes o fotógrafos con alto volumen en mercados USD que publican alrededor de un vídeo cada semana durante todo el año.
- **Precios publicados (2026-11-22):** Fotos: No ofrece home staging virtual en su página de precios. Vídeo: Creator: 37,50 $/mes facturado al año (450 $/año, 52 proyectos); Pro: 66,58 $/mes al año (799 $/año, 100 proyectos, añade montaje vertical y voz con IA).
- **Limitaciones verificables:** Sin editor de home staging virtual; la prueba gratis lleva marca de agua; cobro en dólares y web solo en inglés; la combinación vertical automática exige el plan Pro (799 $/año).
- **Fuente oficial:** [PhotoAIVideo: precios oficiales](https://www.photoaivideo.com/pricing)

### BoxBrownie
- **Para quién encaja mejor:** Propiedades singulares o de lujo donde la agencia prefiere diseño 100 % manual por diseñadores humanos con cambios ilimitados durante 2 meses y entrega en 48 horas.
- **Precios publicados (2026-11-22):** Fotos: 30 € por imagen (tarifa mostrada desde España el 22/11/2026); entrega en 48 horas; cambios ilimitados sin coste durante 2 meses. Vídeo: No ofrece vídeo inmobiliario con IA a partir de fotos.
- **Limitaciones verificables:** Cuesta 150 veces más por foto que la edición con IA a 0,20 € (240 € frente a 1,60 € por 8 fotos); entrega en 48 horas; no crea vídeos inmobiliarios desde fotos.
- **Fuente oficial:** [BoxBrownie: montaje virtual (visto desde España)](https://www.boxbrownie.com/virtual-staging) · [BoxBrownie: precios (visto desde España)](https://www.boxbrownie.com/pricing)

### Styldod
- **Para quién encaja mejor:** Agencias que ya graban tomas propias con cámara o dron y buscan editores humanos o staging manual en dólares.
- **Precios publicados (2026-11-22):** Fotos: 23 $/imagen (<8 imágenes) o 16 $/imagen (8 o más imágenes); entrega 24–48 h; revisiones ilimitadas. Vídeo: Desde 60 $/vídeo (reels sociales o dron) y 80 $/vídeo (vídeo de vivienda) — requiere grabaciones propias de vídeo; mínimo 2 días laborables.
- **Limitaciones verificables:** No genera vídeos a partir de fotografías; entrega en 24–48 h o más; cobro en dólares y web solo en inglés.
- **Fuente oficial:** [Styldod: home staging virtual](https://www.styldod.com/virtual-staging) · [Styldod: edición de vídeo inmobiliario](https://www.styldod.com/real-estate-video-editing)

### Virtual Staging AI
- **Para quién encaja mejor:** Agentes fuera de Europa (p. ej. EE. UU.) que amueblan fotos de forma recurrente con suscripción en dólares.
- **Precios publicados (2026-11-22):** Fotos: Basic (6 fotos/mes): 25 $/mes o 192 $/año (16 $/mes); Standard (20 fotos/mes): 35 $/mes o 228 $/año (19 $/mes); su web indica que no admite clientes de la UE, el EEE ni el Reino Unido. Vídeo: No listado en su página de precios.
- **Limitaciones verificables:** Bloquea explícitamente las suscripciones desde la UE, el EEE y el Reino Unido; suscripción en dólares; sin vídeo inmobiliario en su página de precios.
- **Fuente oficial:** [Virtual Staging AI: precios oficiales (aviso comprobado desde España)](https://www.virtualstagingai.app/prices)

---

## 5. Reglamento de IA de la UE y reglas de portales europeos (resumen)

*Resumen de fuentes oficiales públicas como referencia operativa. No es asesoramiento jurídico.*

### Normas sobre aviso de imágenes editadas con IA

| Jurisdicción | Vigencia | Resumen operativo | Fuente oficial |
|---|---|---|---|
| Unión Europea (Reglamento de IA 2024/1689, art. 50.4) | 2026-08-02 | Quien publica de forma profesional fotos modificadas con IA que pueden parecer reales (como pisos vacíos amueblados virtualmente) debe indicarlo de forma clara y visible desde el primer contacto. La marca de agua invisible por sí sola no basta. | [Fuente oficial](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/spa) |
| Consumo en la UE (Directiva 2005/29/CE y leyes nacionales) | 2005-05-11 | La publicidad engañosa está prohibida en toda la UE (España Ley 3/1991 y RD 515/1989, Alemania UWG § 5, Francia L121-2, Italia art. 21, Portugal art. 7.º). El staging no debe alterar suelos, ventanas, vistas ni desperfectos. | [Fuente oficial](https://eur-lex.europa.eu/eli/dir/2005/29/oj/spa) |
| Reino Unido (DMCC Act 2024, sección 226) | 2025-04-06 | Prohíbe las acciones engañosas hacia los consumidores. Avisar con claridad y mostrar la foto original sin editar sigue siendo la práctica más segura en anuncios inmobiliarios. | [Fuente oficial](https://www.legislation.gov.uk/ukpga/2024/13/section/226) |
| California (AB 723, B&P Code § 10140.8) | 2026-01-01 | Los agentes inmobiliarios que publican imágenes alteradas digitalmente deben indicarlo junto a la imagen y facilitar acceso a la fotografía original sin alterar. | [Fuente oficial](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=10140.8) |

### Requisitos comprobados en portales europeos

| Portal | Formatos | Tamaño máximo | Requisitos y política de IA | Fuente oficial |
|---|---|---|---|---|
| Idealista (ayuda España) | JPG, JPEG, PNG, GIF | 32 MB | Hasta 180 fotos y 6 vídeos (hasta 600 MB cada uno). Permite marcar fotos editadas con IA al subirlas, muestra una etiqueta visible y aplica detección automática por C2PA y modelo propio. | [Ayuda oficial](https://www.idealista.com/tools/centrodeayuda/articulos/identificacion-de-fotos-editadas-con-ia/) |
| ImmoScout24 (Alemania) | JPG, PNG | 50 MB | Recomienda fotos horizontales 4:3; recorta otras proporciones desde el centro salvo que se desactive en ScoutManager. Pide no añadir marcas de agua, marcos ni logotipos. | [Ayuda oficial](https://www.immobilienscout24.de/anbieten/gewerbliche-anbieter/tipps/anwender-tipps/tipps-objektbilder.html) |

---

## 6. Guías ampliadas y datos reutilizables

- Guías completas de Veltas en seis idiomas (ES, EN, DE, FR, IT, PT):
  - [Precio del home staging virtual (2026)](https://video.veltastech.com/es/precio-home-staging-virtual/)
  - [Precio de un vídeo inmobiliario (2026)](https://video.veltastech.com/es/precio-video-inmobiliario/)
  - [Alternativas a Virtual Staging AI en Europa](https://video.veltastech.com/es/alternativas-virtual-staging-ai/)
  - [Normas del home staging virtual (Reglamento de IA, UE, UK, California)](https://video.veltastech.com/es/home-staging-virtual-legal/)
  - [Fotos con IA en Idealista y otros portales](https://video.veltastech.com/es/fotos-idealista-ia/)
  - [Veltas llms.txt](https://video.veltastech.com/llms.txt)
- Archivos del dataset: [`data/tools.json`](data/tools.json) · [`data/tools.csv`](data/tools.csv) · [`data/portals-and-rules.json`](data/portals-and-rules.json)

Licencia [CC BY 4.0](LICENSE). Atribución: *Observatorio Europeo de Veltas (https://video.veltastech.com/)*.
