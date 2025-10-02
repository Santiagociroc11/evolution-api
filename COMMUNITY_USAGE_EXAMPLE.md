# 🚀 Guía Completa de Comunidades WhatsApp - Evolution API

## 📋 Endpoints Disponibles

### **Base URL**: `https://tu-evolution-api.com/community`

---

## 🎯 **1. Crear Comunidad**

**POST** `/community/create`

```json
{
  "subject": "Mi Comunidad",
  "description": "Descripción de mi comunidad"
}
```

**Respuesta:**
```json
{
  "id": "120363123456789012@g.us",
  "subject": "Mi Comunidad",
  "description": "Descripción de mi comunidad",
  "isCommunity": true,
  "isCommunityAnnounce": false,
  "participants": [...],
  "owner": "1234567890@s.whatsapp.net",
  "creation": 1640995200,
  "restrict": false,
  "announce": false,
  "linkedParent": null,
  "inviteCode": "ABC123DEF456",
  "inviteLink": "https://chat.whatsapp.com/ABC123DEF456"
}
```

---

## 🎯 **2. Crear Grupo en Comunidad**

**POST** `/community/create-group`

```json
{
  "subject": "General",
  "participants": [
    "1234567890@s.whatsapp.net",
    "0987654321@s.whatsapp.net",
    "1122334455@s.whatsapp.net"
  ],
  "parentCommunityJid": "120363123456789012@g.us"
}
```

**Respuesta:**
```json
{
  "id": "120363123456789013@g.us",
  "subject": "General",
  "description": null,
  "isCommunity": false,
  "isCommunityAnnounce": false,
  "participants": [...],
  "owner": "1234567890@s.whatsapp.net",
  "creation": 1640995200,
  "restrict": false,
  "announce": false,
  "linkedParent": "120363123456789012@g.us",
  "inviteCode": "XYZ789GHI012",
  "inviteLink": "https://chat.whatsapp.com/XYZ789GHI012"
}
```

---

## 🎯 **3. Promover Participantes a Administradores**

**PUT** `/community/participants`

```json
{
  "communityJid": "120363123456789012@g.us",
  "participants": [
    "1234567890@s.whatsapp.net",
    "0987654321@s.whatsapp.net"
  ],
  "action": "promote"
}
```

**Otras acciones disponibles:**
- `"demote"` - Degradar administradores
- `"add"` - Agregar participantes
- `"remove"` - Remover participantes

---

## 🎯 **4. Cambiar Foto de la Comunidad**

**PUT** `/community/picture`

```json
{
  "communityJid": "120363123456789012@g.us",
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
}
```

---

## 🎯 **5. Configurar Solo Admins Pueden Hablar**

**PUT** `/community/setting`

```json
{
  "communityJid": "120363123456789012@g.us",
  "setting": "announcement"
}
```

**Configuraciones disponibles:**
- `"announcement"` - Solo admins pueden hablar
- `"not_announcement"` - Todos pueden hablar

---

## 🎯 **6. Configurar Solo Admins Pueden Agregar Grupos**

**PUT** `/community/member-add-mode`

```json
{
  "communityJid": "120363123456789012@g.us",
  "mode": "admin_add"
}
```

**Modos disponibles:**
- `"admin_add"` - Solo admins pueden agregar grupos
- `"everyone_add"` - Todos pueden agregar grupos

---

## 🎯 **7. Obtener Información de la Comunidad**

**GET** `/community/get`

```json
{
  "communityJid": "120363123456789012@g.us"
}
```

---

## 🎯 **8. Obtener Grupos de la Comunidad**

**GET** `/community/groups`

```json
{
  "communityJid": "120363123456789012@g.us"
}
```

---

## 🎯 **9. Generar Código de Invitación**

**POST** `/community/generate-invite`

```json
{
  "communityJid": "120363123456789012@g.us"
}
```

**Respuesta:**
```json
{
  "inviteCode": "ABC123DEF456"
}
```

---

## 🎯 **10. Revocar Código de Invitación**

**DELETE** `/community/revoke-invite`

```json
{
  "communityJid": "120363123456789012@g.us"
}
```

---

## 🎯 **11. Aceptar Invitación a Comunidad**

**POST** `/community/accept-invite`

```json
{
  "inviteCode": "ABC123DEF456"
}
```

---

## 🎯 **12. Enviar Invitación por Número**

**POST** `/community/send-invite`

```json
{
  "communityJid": "120363123456789012@g.us",
  "description": "Únete a nuestra comunidad",
  "numbers": [
    "1234567890",
    "0987654321"
  ]
}
```

---

## 🎯 **13. Eliminar Grupo de la Comunidad**

**DELETE** `/community/delete-group`

```json
{
  "communityJid": "120363123456789012@g.us",
  "groupJid": "120363123456789013@g.us"
}
```

---

## 🎯 **14. Actualizar Descripción de la Comunidad**

**PUT** `/community/description`

```json
{
  "communityJid": "120363123456789012@g.us",
  "description": "Nueva descripción de la comunidad"
}
```

---

## 🎯 **15. Actualizar Nombre de la Comunidad**

**PUT** `/community/subject`

```json
{
  "communityJid": "120363123456789012@g.us",
  "subject": "Nuevo Nombre de la Comunidad"
}
```

---

# 🚀 **Script Completo de Implementación**

```javascript
// Configuración base
const BASE_URL = 'https://tu-evolution-api.com';
const INSTANCE_NAME = 'mi-instancia';
const API_KEY = 'tu-api-key';

const headers = {
  'Content-Type': 'application/json',
  'apikey': API_KEY
};

// Función helper para hacer requests
async function makeRequest(endpoint, method = 'GET', data = null) {
  const url = `${BASE_URL}/community/${endpoint}`;
  const options = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null
  };
  
  const response = await fetch(url, options);
  return await response.json();
}

// 1. Crear comunidad
async function createCommunity() {
  const community = await makeRequest('create', 'POST', {
    subject: "Mi Comunidad",
    description: "Descripción de mi comunidad"
  });
  
  console.log('Comunidad creada:', community.id);
  console.log('Link de invitación:', community.inviteLink);
  return community;
}

// 2. Crear grupo general con participantes
async function createGeneralGroup(communityId) {
  const participants = [
    "1234567890@s.whatsapp.net",
    "0987654321@s.whatsapp.net",
    "1122334455@s.whatsapp.net"
  ];
  
  const group = await makeRequest('create-group', 'POST', {
    subject: "General",
    participants: participants,
    parentCommunityJid: communityId
  });
  
  console.log('Grupo general creado:', group.id);
  console.log('Link de invitación del grupo:', group.inviteLink);
  return group;
}

// 3. Promover participantes a administradores
async function promoteParticipants(communityId, participants) {
  await makeRequest('participants', 'PUT', {
    communityJid: communityId,
    participants: participants,
    action: "promote"
  });
  
  console.log('Participantes promovidos a administradores');
}

// 4. Cambiar foto de la comunidad
async function updateCommunityPicture(communityId, imageBase64) {
  await makeRequest('picture', 'PUT', {
    communityJid: communityId,
    image: imageBase64
  });
  
  console.log('Foto de comunidad actualizada');
}

// 5. Configurar solo admins pueden hablar
async function setAnnouncementMode(communityId) {
  await makeRequest('setting', 'PUT', {
    communityJid: communityId,
    setting: "announcement"
  });
  
  console.log('Configurado: Solo admins pueden hablar');
}

// 6. Configurar solo admins pueden agregar grupos
async function setAdminAddMode(communityId) {
  await makeRequest('member-add-mode', 'PUT', {
    communityJid: communityId,
    mode: "admin_add"
  });
  
  console.log('Configurado: Solo admins pueden agregar grupos');
}

// Función principal para configurar comunidad completa
async function setupCompleteCommunity() {
  try {
    // 1. Crear comunidad
    const community = await createCommunity();
    
    // 2. Crear grupo general
    const participants = [
      "1234567890@s.whatsapp.net",
      "0987654321@s.whatsapp.net",
      "1122334455@s.whatsapp.net"
    ];
    
    const generalGroup = await createGeneralGroup(community.id);
    
    // 3. Promover participantes a administradores
    await promoteParticipants(community.id, participants);
    
    // 4. Cambiar foto (opcional)
    // const imageBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...";
    // await updateCommunityPicture(community.id, imageBase64);
    
    // 5. Configurar solo admins pueden hablar
    await setAnnouncementMode(community.id);
    
    // 6. Configurar solo admins pueden agregar grupos
    await setAdminAddMode(community.id);
    
    console.log('✅ Configuración de comunidad completada exitosamente');
    console.log('📱 Comunidad ID:', community.id);
    console.log('🔗 Link de invitación de la comunidad:', community.inviteLink);
    console.log('👥 Grupo General ID:', generalGroup.id);
    console.log('🔗 Link de invitación del grupo:', generalGroup.inviteLink);
    
    return {
      communityId: community.id,
      communityInviteLink: community.inviteLink,
      generalGroupId: generalGroup.id,
      groupInviteLink: generalGroup.inviteLink,
      participants: participants
    };
    
  } catch (error) {
    console.error('❌ Error configurando comunidad:', error);
    throw error;
  }
}

// Ejecutar configuración
setupCompleteCommunity()
  .then(result => {
    console.log('🎉 Resultado final:', result);
  })
  .catch(error => {
    console.error('💥 Error:', error);
  });
```

---

# 📝 **Notas Importantes**

1. **JIDs de participantes**: Deben estar en formato `numero@s.whatsapp.net`
2. **Imagen**: Debe ser un Buffer en base64 con el prefijo `data:image/jpeg;base64,`
3. **Orden de operaciones**: Es importante crear la comunidad primero, luego el grupo
4. **Permisos**: Solo el creador de la comunidad puede hacer estas configuraciones inicialmente
5. **Autenticación**: Todos los endpoints requieren `apikey` en el header
6. **Instancia**: Asegúrate de que la instancia esté conectada y funcionando
7. **Links de invitación**: Se generan automáticamente al crear comunidades y grupos
8. **Códigos de invitación**: Si no se puede generar el código, se devuelve `null` sin error

---

# 🔗 **Links de Invitación Automáticos**

## ✅ **¿Qué se genera automáticamente?**

Al crear una **comunidad** o un **grupo en comunidad**, la Evolution API genera automáticamente:

- **`inviteCode`**: Código de invitación (ej: `ABC123DEF456`)
- **`inviteLink`**: Link completo de WhatsApp (ej: `https://chat.whatsapp.com/ABC123DEF456`)

## 📱 **Ejemplo de respuesta completa:**

```json
{
  "id": "120363123456789012@g.us",
  "subject": "Mi Comunidad",
  "description": "Descripción de mi comunidad",
  "isCommunity": true,
  "isCommunityAnnounce": false,
  "participants": [...],
  "owner": "1234567890@s.whatsapp.net",
  "creation": 1640995200,
  "restrict": false,
  "announce": false,
  "linkedParent": null,
  "inviteCode": "ABC123DEF456",
  "inviteLink": "https://chat.whatsapp.com/ABC123DEF456"
}
```

## ⚠️ **Manejo de errores:**

Si no se puede generar el código de invitación:
- **`inviteCode`**: `null`
- **`inviteLink`**: `null`
- **No se lanza error**: Solo se registra una advertencia en los logs

## 🎯 **Uso práctico:**

```javascript
// Crear comunidad y obtener link inmediatamente
const community = await createCommunity();
console.log('Comparte este link:', community.inviteLink);

// El link se puede usar directamente en WhatsApp
// https://chat.whatsapp.com/ABC123DEF456
```

---

# 🔧 **Headers Requeridos**

```javascript
{
  "Content-Type": "application/json",
  "apikey": "tu-api-key"
}
```

---

# ⚠️ **Limitaciones**

- Solo funciona con instancias de **Baileys** (WhatsApp Web)
- Requiere que la instancia esté **conectada** y **autenticada**
- Los participantes deben tener **WhatsApp** y estar **disponibles**
- Algunas operaciones requieren **permisos de administrador**

---

# 🎯 **Casos de Uso Comunes**

1. **Crear comunidad de empresa** con grupos por departamentos
2. **Configurar comunidad de clientes** con diferentes canales
3. **Gestionar comunidad educativa** con grupos por materias
4. **Administrar comunidad de eventos** con grupos por fechas
5. **Crear comunidad de soporte** con diferentes niveles de acceso
