# 📚 Documentación: Escanear Grupos Admin - Evolution API

## 📋 Resumen

Nuevo endpoint optimizado para obtener **solo los grupos donde la sesión es administrador**, incluyendo fotos de perfil y participantes.

**Ventaja clave**: En lugar de obtener 500 grupos y filtrarlos manualmente, este endpoint devuelve solo los ~120 grupos donde eres admin, reduciendo el tiempo de ~18s a ~4-5s.

---

## 🚀 Endpoint Principal

```http
GET /group/fetchAdminGroups
```

### Headers requeridos

```http
apikey: YOUR_API_KEY
```

### Query Parameters

| Parámetro | Tipo | Valores | Descripción |
|-----------|------|---------|-------------|
| `getParticipants` | string | `"true"` o `"false"` | Incluir lista de participantes en la respuesta JSON |

**⚠️ Importante**: El filtrado de grupos admin **siempre funciona**, independientemente del valor de `getParticipants`. Este parámetro solo controla si se incluyen los participantes en la respuesta JSON final. El filtrado interno usa los participantes que vienen de WhatsApp (siempre disponibles).

### Ejemplos de URL

```
# Solo grupos admin con fotos (sin participantes en JSON)
# ⚡ MÁS RÁPIDO - Menos datos transferidos
GET /group/fetchAdminGroups?getParticipants=false

# Grupos admin con fotos y participantes en JSON
# 📊 ÚTIL si necesitas ver la lista de participantes
GET /group/fetchAdminGroups?getParticipants=true
```

**💡 Recomendación**: Usa `getParticipants=false` si solo necesitas la lista de grupos admin. Usa `getParticipants=true` si también necesitas ver quién está en cada grupo.

---

## 📊 Respuesta

### Estructura de la respuesta

```typescript
interface GroupResponse {
  id: string;                    // "120363xxxxx@g.us"
  subject: string;               // "Nombre del Grupo"
  subjectOwner: string;          // JID del creador
  subjectTime: number;           // Timestamp de creación del nombre
  pictureUrl: string | null;     // URL de foto de perfil
  size: number;                  // Cantidad de participantes
  creation: number;              // Timestamp de creación del grupo
  owner: string;                 // JID del dueño del grupo
  desc: string;                  // Descripción del grupo
  descId: string;                // ID de la descripción
  restrict: boolean;             // Solo admins pueden editar info
  announce: boolean;             // Solo admins pueden enviar mensajes
  isCommunity: boolean;          // Es comunidad de WhatsApp
  isCommunityAnnounce: boolean;  // Anuncios de comunidad
  linkedParent: string | null;   // Comunidad padre (si aplica)
  isOwner: boolean;              // ⭐ NUEVO: true si eres el creador
  participants?: Participant[];  // Solo si getParticipants=true
}

interface Participant {
  id: string;                    // "5511999999999@s.whatsapp.net"
  admin: "admin" | "superadmin" | null; // Rol del participante
  name?: string;                 // Nombre del participante
  imgUrl?: string;               // Foto del participante
}
```

### Ejemplo de respuesta

```json
[
  {
    "id": "120363025810854588@g.us",
    "subject": "Equipo de Marketing",
    "subjectOwner": "5511999999999@s.whatsapp.net",
    "subjectTime": 1704067200,
    "pictureUrl": "https://pps.whatsapp.net/v/t61.24694-24/...",
    "size": 45,
    "creation": 1704067200,
    "owner": "5511999999999@s.whatsapp.net",
    "desc": "Grupo oficial del equipo de marketing",
    "descId": "12345",
    "restrict": false,
    "announce": false,
    "isCommunity": false,
    "isCommunityAnnounce": false,
    "linkedParent": null,
    "isOwner": true,
    "participants": [
      {
        "id": "5511999999999@s.whatsapp.net",
        "admin": "superadmin",
        "name": "Juan Pérez"
      },
      {
        "id": "5511888888888@s.whatsapp.net",
        "admin": "admin",
        "name": "María García"
      },
      {
        "id": "5511777777777@s.whatsapp.net",
        "admin": null,
        "name": "Pedro López"
      }
    ]
  },
  {
    "id": "120363025810854589@g.us",
    "subject": "Soporte Técnico",
    "pictureUrl": null,
    "size": 120,
    "owner": "5511666666666@s.whatsapp.net",
    "isOwner": false,
    "participants": [...]
  }
]
```

---

## 💻 Implementación

### JavaScript/TypeScript

```typescript
/**
 * Escanea grupos donde la sesión es administrador
 * @param apiKey - API key de Evolution API
 * @param includeParticipants - Incluir lista de participantes
 * @returns Array de grupos admin
 */
async function fetchAdminGroups(
  apiKey: string, 
  includeParticipants: boolean = true
) {
  const url = `${process.env.EVOLUTION_API_URL}/group/fetchAdminGroups?getParticipants=${includeParticipants}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'apikey': apiKey,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// Uso
const groups = await fetchAdminGroups('your-api-key', true);
console.log(`Encontrados ${groups.length} grupos admin`);
```

### Python

```python
import requests
import os

def fetch_admin_groups(api_key: str, include_participants: bool = True) -> list:
    """
    Escanea grupos donde la sesión es administrador
    
    Args:
        api_key: API key de Evolution API
        include_participants: Incluir lista de participantes
        
    Returns:
        Lista de grupos admin
    """
    url = f"{os.getenv('EVOLUTION_API_URL')}/group/fetchAdminGroups"
    params = {'getParticipants': 'true' if include_participants else 'false'}
    headers = {
        'apikey': api_key,
        'Content-Type': 'application/json'
    }
    
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    
    return response.json()

# Uso
groups = fetch_admin_groups('your-api-key', True)
print(f"Encontrados {len(groups)} grupos admin")
```

### cURL

```bash
curl -X GET \
  "https://your-evolution-api.com/group/fetchAdminGroups?getParticipants=true" \
  -H "apikey: YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

---

## ⏱️ Tiempos de respuesta

| Cantidad de grupos admin | Tiempo estimado |
|--------------------------|-----------------|
| 50 grupos                | ~2 segundos     |
| 100 grupos               | ~3-4 segundos   |
| 200 grupos               | ~6-7 segundos   |
| 500 grupos               | ~17 segundos    |

**Nota**: El tiempo depende principalmente de la descarga de fotos de perfil, que se hace en lotes optimizados de 10 grupos cada 300ms.

---

## 🎯 Casos de uso

### Caso 1: Botón "Escanear" (con fotos)

```typescript
async function handleScanGroups() {
  setLoading(true);
  setStatus('Escaneando grupos...');
  
  try {
    const groups = await fetchAdminGroups(apiKey, true);
    
    setStatus(`✅ ${groups.length} grupos encontrados`);
    setGroups(groups);
    
  } catch (error) {
    setStatus('❌ Error al escanear');
    console.error(error);
  } finally {
    setLoading(false);
  }
}
```

### Caso 2: Botón "Actualizar BD"

```typescript
async function handleUpdateDatabase() {
  setLoading(true);
  setStatus('Actualizando base de datos...');
  
  try {
    // 1. Escanear grupos admin
    const groups = await fetchAdminGroups(apiKey, false); // Sin participantes = más rápido
    
    // 2. Actualizar en tu BD
    await fetch('/api/groups/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        sessionId,
        groups: groups.map(g => ({
          groupJid: g.id,
          groupName: g.subject,
          groupPicture: g.pictureUrl,
          participantsCount: g.size,
          isOwner: g.isOwner,
          description: g.desc,
          createdAt: new Date(g.creation * 1000)
        }))
      })
    });
    
    setStatus(`✅ ${groups.length} grupos actualizados en BD`);
    
  } catch (error) {
    setStatus('❌ Error al actualizar');
    console.error(error);
  } finally {
    setLoading(false);
  }
}
```

### Caso 3: Mostrar estadísticas

```typescript
async function loadGroupStats() {
  try {
    const adminGroups = await fetchAdminGroups(apiKey, false);
    
    const stats = {
      totalAdminGroups: adminGroups.length,
      asOwner: adminGroups.filter(g => g.isOwner).length,
      asAdmin: adminGroups.filter(g => !g.isOwner).length,
      withPicture: adminGroups.filter(g => g.pictureUrl).length,
      communities: adminGroups.filter(g => g.isCommunity).length
    };
    
    return stats;
  } catch (error) {
    console.error('Error loading stats:', error);
    return null;
  }
}
```

---

## 🔒 Seguridad y rate limiting

### Rate limiting integrado

El endpoint implementa **procesamiento en lotes** para evitar bloqueos:

- **10 grupos por lote**
- **300ms de delay** entre lotes
- **Jitter aleatorio** (±50ms) para simular comportamiento humano

Esto significa que el endpoint es **seguro contra bloqueos de WhatsApp**, incluso con cientos de grupos.

### Recomendaciones

1. **No llamar muy frecuentemente**: Implementa cache de 5-10 minutos
2. **Mostrar loading**: El proceso puede tardar varios segundos
3. **Manejo de errores**: Implementa reintentos con backoff exponencial

```typescript
// Ejemplo de cache simple
let cachedGroups = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

async function getGroupsWithCache(apiKey: string) {
  const now = Date.now();
  
  if (cachedGroups && (now - cacheTime) < CACHE_TTL) {
    console.log('Using cached groups');
    return cachedGroups;
  }
  
  console.log('Fetching fresh groups');
  cachedGroups = await fetchAdminGroups(apiKey, true);
  cacheTime = now;
  
  return cachedGroups;
}
```

---

## ❌ Manejo de errores

### Errores comunes

| Código | Error | Solución |
|--------|-------|----------|
| 401 | Unauthorized | Verificar API key |
| 404 | Not Found | Verificar URL del endpoint |
| 500 | Instance not found | La sesión no está conectada |
| 503 | Service unavailable | Evolution API no disponible |

### Ejemplo de manejo de errores

```typescript
async function fetchAdminGroupsSafe(apiKey: string) {
  try {
    const groups = await fetchAdminGroups(apiKey, true);
    return { success: true, data: groups, error: null };
    
  } catch (error) {
    if (error.response?.status === 401) {
      return { 
        success: false, 
        data: null, 
        error: 'API key inválida' 
      };
    }
    
    if (error.response?.status === 500) {
      return { 
        success: false, 
        data: null, 
        error: 'Sesión no conectada. Por favor, escanea el QR primero.' 
      };
    }
    
    return { 
      success: false, 
      data: null, 
      error: 'Error al escanear grupos. Intenta nuevamente.' 
    };
  }
}
```

---

## 🔄 Comparación con endpoint anterior

| Aspecto | `fetchAllGroups` | `fetchAdminGroups` (NUEVO) |
|---------|------------------|----------------------------|
| **URL** | `/group/fetchAllGroups` | `/group/fetchAdminGroups` |
| **Grupos** | Todos (ej: 500) | Solo admin (ej: 120) |
| **Tiempo** | ~18 segundos | ~4-5 segundos ⚡ |
| **Filtrado** | Manual en tu app | Automático en API ✅ |
| **Fotos** | Todas (500) | Solo admin (120) |
| **Campo `isOwner`** | ❌ No | ✅ Sí |
| **Uso recomendado** | Ver todos los grupos | **Escanear grupos admin** |

---

## 📝 Notas adicionales

### Roles de participantes

Los valores posibles para `participant.admin` son:

- `"superadmin"`: Creador del grupo
- `"admin"`: Administrador del grupo
- `null`: Miembro normal

### Campo `isOwner`

- `true`: Eres el creador del grupo (tienes control total)
- `false`: Eres admin pero no creador (puedes ser removido)

### Fotos de perfil

- Pueden ser `null` si el grupo no tiene foto
- Las URLs son temporales de WhatsApp (pueden expirar)
- Recomendado: descargar y almacenar localmente si necesitas cache

---

## 🐛 Troubleshooting

### "No se encontraron grupos admin"

**Posibles causas:**
1. La sesión no es admin en ningún grupo
2. La sesión está desconectada
3. Error en la autenticación

**Solución:**
```typescript
const groups = await fetchAdminGroups(apiKey, true);
if (groups.length === 0) {
  console.log('No eres administrador en ningún grupo');
}
```

### "Timeout al escanear"

**Causa:** Muchos grupos admin (>300)

**Solución:** Aumentar timeout del fetch
```typescript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s

const response = await fetch(url, {
  headers: { apikey },
  signal: controller.signal
});
```

### "Grupos sin foto"

**Causa:** Normal, algunos grupos no tienen foto

**Solución:** Usar placeholder
```typescript
const picture = group.pictureUrl || '/placeholder-group.png';
```

---

## 📞 Soporte

Si tienes dudas sobre la implementación:
1. Revisa los logs del servidor Evolution API
2. Verifica que la sesión esté conectada
3. Confirma que el API key sea válido

---

## ✅ Checklist de implementación

- [ ] Configurar `EVOLUTION_API_URL` en variables de entorno
- [ ] Implementar función `fetchAdminGroups()`
- [ ] Agregar manejo de errores
- [ ] Implementar loading states en UI
- [ ] Agregar cache de 5-10 minutos
- [ ] Probar con sesión conectada
- [ ] Probar con sesión desconectada
- [ ] Implementar botón "Actualizar BD"
- [ ] Mostrar estadísticas (total, como owner, como admin)

---

**Última actualización:** Enero 2026  
**Versión mínima Evolution API:** v2.0.0+
