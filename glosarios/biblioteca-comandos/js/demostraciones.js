"use strict";

// Datos simulados: ninguna demostración ejecuta comandos reales.
const demostraciones = {
  "linux-whoami": { sistema: "Linux", comando: "whoami", resultado: "alumno", aclaracion: "Muestra el usuario que está ejecutando el comando." },
  "windows-whoami": { sistema: "Windows CMD", comando: "whoami", resultado: "PC-AULA-WIN\\Alumno", aclaracion: "Muestra el usuario que está ejecutando el comando." },
  "linux-hostname": { sistema: "Linux", comando: "hostname", resultado: "pc-aula", aclaracion: "Muestra el nombre del equipo, no su dirección IP." },
  "windows-hostname": { sistema: "Windows CMD", comando: "hostname", resultado: "PC-AULA-WIN", aclaracion: "Muestra el nombre del equipo, no su dirección IP." },
  "linux-uname": { sistema: "Linux", comando: "uname -a", resultado: "Linux pc-aula 6.8.0-51-generic #52-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux", aclaracion: "Muestra información del sistema Linux, incluido el kernel y la arquitectura." },
  "windows-ver": { sistema: "Windows CMD", comando: "ver", resultado: "Microsoft Windows [Versión 10.0.19045.4894]", aclaracion: "Muestra la versión de Windows, pero no ofrece tantos detalles como uname -a." },
  "linux-pwd": { sistema: "Linux", comando: "pwd", resultado: "/home/alumno", aclaracion: "La salida muestra la ruta completa del directorio actual." },
  "windows-cd-actual": { sistema: "Windows CMD", comando: "cd", resultado: "C:\\Users\\Alumno", aclaracion: "En CMD, cd sin argumentos muestra la ubicación; en Linux lleva a la carpeta personal." },
  "linux-ls": { sistema: "Linux", comando: "ls", resultado: "Documentos  notas.txt", aclaracion: "El listado muestra archivos y carpetas del directorio actual." },
  "linux-ls-la": { sistema: "Linux", comando: "ls -la", resultado: "total 20\ndrwxr-xr-x 3 alumno alumno 4096 oct 18 10:00 .\ndrwxr-xr-x 3 root   root   4096 oct 18 09:00 ..\n-rw------- 1 alumno alumno  220 oct 18 09:00 .bash_history\ndrwxr-xr-x 2 alumno alumno 4096 oct 18 10:00 Documentos\n-rw-r--r-- 1 alumno alumno   42 oct 18 10:00 notas.txt", aclaracion: "Aparecen también los nombres que comienzan por punto y detalles como permisos y tamaño." },
  "windows-dir": { sistema: "Windows CMD", comando: "dir", resultado: " Directorio de C:\\Users\\Alumno\n\n18/10/2026  10:00    <DIR>          Documentos\n18/10/2026  10:00                42 notas.txt\n               1 archivos             42 bytes\n               1 dirs", aclaracion: "El listado muestra archivos y carpetas; <DIR> identifica un directorio." },
  "windows-dir-a": { sistema: "Windows CMD", comando: "dir /a", resultado: " Directorio de C:\\Users\\Alumno\n\n18/10/2026  10:00    <DIR>          .\n18/10/2026  09:00    <DIR>          ..\n18/10/2026  09:00    <DIR>          AppData\n18/10/2026  10:00    <DIR>          Documentos\n18/10/2026  10:00                42 notas.txt\n               1 archivos             42 bytes\n               4 dirs", aclaracion: "La opción /a incluye elementos ocultos y de sistema, como AppData." },
  "linux-cd-documentos": { sistema: "Linux", comando: "cd Documentos", resultado: "", promptFinal: "alumno@pc-aula:~/Documentos$ ", aclaracion: "No aparece un mensaje: el cambio se reconoce en el prompt." },
  "windows-cd-documentos": { sistema: "Windows CMD", comando: "cd Documentos", resultado: "", promptFinal: "C:\\Users\\Alumno\\Documentos> ", aclaracion: "No aparece un mensaje: el cambio se reconoce en el prompt." },
  "linux-cd-superior": { sistema: "Linux", comando: "cd ..", resultado: "", promptInicial: "alumno@pc-aula:~/Documentos$ ", promptFinal: "alumno@pc-aula:~$ ", aclaracion: ".. representa el directorio superior." },
  "windows-cd-superior": { sistema: "Windows CMD", comando: "cd ..", resultado: "", promptInicial: "C:\\Users\\Alumno\\Documentos> ", promptFinal: "C:\\Users\\Alumno> ", aclaracion: ".. representa el directorio superior." },
  "linux-cd-raiz": { sistema: "Linux", comando: "cd /", resultado: "", promptFinal: "alumno@pc-aula:/$ ", aclaracion: "En Linux, / representa la raíz del sistema de archivos." },
  "windows-cd-raiz": { sistema: "Windows CMD", comando: "cd \\", resultado: "", promptFinal: "C:\\> ", aclaracion: "En CMD, \\ representa la raíz de la unidad actual." },
  "linux-mkdir": { sistema: "Linux", comando: "mkdir Practicas", resultado: "", aclaracion: "Cuando se crea correctamente una carpeta, normalmente no aparece ningún mensaje. Puedes comprobarlo con ls o dir." },
  "windows-mkdir": { sistema: "Windows CMD", comando: "mkdir Practicas", resultado: "", aclaracion: "Cuando se crea correctamente una carpeta, normalmente no aparece ningún mensaje. Puedes comprobarlo con ls o dir." },
  "linux-rmdir": { sistema: "Linux", comando: "rmdir Temporal", resultado: "", aclaracion: "rmdir elimina directorios vacíos. Si la carpeta contiene archivos, el comando no podrá eliminarla de esta manera." },
  "windows-rmdir": { sistema: "Windows CMD", comando: "rmdir Temporal", resultado: "", aclaracion: "rmdir elimina directorios vacíos. Si la carpeta contiene archivos, el comando no podrá eliminarla de esta manera." },
  "linux-cp": { sistema: "Linux", comando: "cp -i notas.txt Practicas/notas-copia.txt", resultado: "", aclaracion: "Copiar crea otro archivo con el contenido del original. El archivo de origen sigue existiendo." },
  "windows-copy": { sistema: "Windows CMD", comando: "copy notas.txt Practicas\\notas-copia.txt", resultado: "        1 archivo(s) copiado(s).", aclaracion: "Copiar crea otro archivo con el contenido del original. El archivo de origen sigue existiendo." },
  "linux-mv": { sistema: "Linux", comando: "mv -i notas.txt Practicas/", resultado: "", aclaracion: "El archivo pasa a la carpeta Practicas y deja de estar en la carpeta de origen." },
  "windows-move": { sistema: "Windows CMD", comando: "move notas.txt Practicas\\", resultado: "        1 archivo(s) movido(s).", aclaracion: "El archivo pasa a la carpeta Practicas y deja de estar en la carpeta de origen." },
  "linux-clear": { sistema: "Linux", comando: "clear", historial: "alumno@pc-aula:~$ pwd\n/home/alumno\nalumno@pc-aula:~$ ls\nDocumentos  notas.txt\n", limpiar: true, resultado: "", aclaracion: "El comando limpia la pantalla visible de la terminal. No borra archivos ni modifica la configuración del equipo." },
  "windows-cls": { sistema: "Windows CMD", comando: "cls", historial: "C:\\Users\\Alumno>cd\nC:\\Users\\Alumno\nC:\\Users\\Alumno>whoami\npc-aula-win\\Alumno\n", limpiar: true, resultado: "", aclaracion: "El comando limpia la pantalla visible de la terminal. No borra archivos ni modifica la configuración del equipo." },
  "linux-man-ls": { sistema: "Linux", comando: "man ls", resultado: "LS(1)                    User Commands                    LS(1)\n\nNAME\n    ls - list directory contents\n\nSYNOPSIS\n    ls [OPTION]... [FILE]...\n\nDESCRIPTION\n    List information about the files.\n\n[Vista simplificada]", aclaracion: "Esta es una vista simplificada: man abre el manual del comando. Puedes desplazarte por sus páginas y pulsar q para salir." },
  "windows-help": { sistema: "Windows CMD", comando: "help", resultado: "Para obtener más información acerca de un comando específico,\nescriba HELP seguido del nombre del comando.\n\nCD             Muestra el nombre del directorio actual o lo cambia.\nCOPY           Copia uno o más archivos a otra ubicación.\nDIR            Muestra una lista de archivos y subdirectorios.\nMKDIR          Crea un directorio.", aclaracion: "help muestra los comandos disponibles. Para consultar uno en particular, utiliza help seguido de su nombre, por ejemplo help dir." },
  "windows-help-dir": { sistema: "Windows CMD", comando: "help dir", resultado: "Muestra una lista de archivos y subdirectorios en un directorio.\n\nDIR [unidad:][ruta][archivo] [opciones]\n\n  /A    Muestra los archivos con los atributos especificados.\n  /P    Hace una pausa después de cada pantalla de información.\n  /W    Usa el formato de listado ancho.\n\n[Fragmento de la ayuda]", aclaracion: "La ayuda de dir describe su sintaxis y algunas opciones para mostrar el contenido de una carpeta." },
  "linux-ip-addr": { sistema: "Linux", comando: "ip addr", resultado: "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 state UNKNOWN\n    link/loopback 00:00:00:00:00:00\n    inet 127.0.0.1/8 scope host lo\n2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 state UP\n    link/ether 02:11:22:33:44:55\n    inet 192.168.1.50/24 brd 192.168.1.255 scope global enp0s3\n    inet6 fe80::11:22ff:fe33:4455/64 scope link", aclaracion: "En esta salida puedes identificar los siguientes elementos:", detalles: [
    ["lo", " (loopback) es una interfaz virtual para que el ordenador se comunique consigo mismo. Su IPv4 habitual es 127.0.0.1."],
    ["enp0s3", " es la interfaz Ethernet del ejemplo. Su nombre puede variar y puede haber otras interfaces, como Wi-Fi, VPN o adaptadores virtuales."],
    ["inet 192.168.1.50/24", " indica la IPv4 y la longitud del prefijo en notación CIDR. /24 equivale a la máscara 255.255.255.0."],
    ["brd 192.168.1.255", " es la dirección de broadcast de esta red IPv4."],
    ["link/ether 02:11:22:33:44:55", " identifica la dirección MAC de la interfaz."],
    ["inet6 fe80::11:22ff:fe33:4455/64", " es una dirección IPv6 de enlace local."],
    ["state UP", " indica que la interfaz está operativa, pero no garantiza conexión a Internet."]
  ] },
  "windows-ipconfig": { sistema: "Windows CMD", comando: "ipconfig", resultado: "Configuración IP de Windows\n\nAdaptador de Ethernet Ethernet:\n\n   Dirección IPv4. . . . . . . . . . . . : 192.168.1.50\n   Máscara de subred . . . . . . . . . . : 255.255.255.0\n   Puerta de enlace predeterminada . . . . : 192.168.1.1", aclaracion: "En el adaptador Ethernet del ejemplo, observa:", detalles: [
    ["192.168.1.50", " es la dirección IPv4 del ordenador en esa interfaz."],
    ["255.255.255.0", " es la máscara de subred; equivale al prefijo /24."],
    ["192.168.1.1", " es la puerta de enlace, normalmente el router que permite comunicarse con otras redes."]
  ] },
  "windows-ipconfig-all": { sistema: "Windows CMD", comando: "ipconfig /all", resultado: "Configuración IP de Windows\n\n   Nombre de host . . . . . . . . . . . . : PC-AULA-WIN\n\nAdaptador de Ethernet Ethernet:\n\n   Descripción . . . . . . . . . . . . . : Adaptador Ethernet\n   Dirección física . . . . . . . . . . . : 02-AA-BB-CC-DD-EE\n   DHCP habilitado . . . . . . . . . . . : Sí\n   Dirección IPv4. . . . . . . . . . . . : 192.168.1.50 (Preferido)\n   Máscara de subred . . . . . . . . . . : 255.255.255.0\n   Puerta de enlace predeterminada . . . . : 192.168.1.1\n   Servidores DNS . . . . . . . . . . . . : 192.168.1.1", aclaracion: "La información del adaptador Ethernet incluye:", detalles: [
    ["02-AA-BB-CC-DD-EE", " es la dirección física o MAC de la interfaz."],
    ["DHCP habilitado: Sí", " indica que el adaptador está configurado para obtener su IPv4 automáticamente."],
    ["192.168.1.50", " es la IPv4; 255.255.255.0 es su máscara de subred."],
    ["192.168.1.1", " aparece como puerta de enlace para llegar a otras redes y como servidor DNS para consultar nombres. Es habitual en redes domésticas."]
  ] },
  "linux-ip-link": { sistema: "Linux", comando: "ip link", resultado: "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 state UNKNOWN\n    link/loopback 00:00:00:00:00:00\n2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 state UP\n    link/ether 02:11:22:33:44:55 brd ff:ff:ff:ff:ff:ff", aclaracion: "La salida permite distinguir interfaces y estados; no muestra sus direcciones IP como ip addr:", detalles: [
    ["lo y enp0s3", " son los nombres de la interfaz de loopback y de la interfaz Ethernet del ejemplo."],
    ["UP", " entre los indicadores señala que la interfaz está habilitada; state UP indica que está operativa."],
    ["link/ether 02:11:22:33:44:55", " muestra la dirección MAC de enp0s3."]
  ] },
  "windows-netsh-interfaces": { sistema: "Windows CMD", comando: "netsh interface show interface", resultado: "Estado admin.  Estado          Tipo             Nombre de interfaz\n-------------------------------------------------------------------------\nHabilitada     Conectado       Dedicado         Ethernet\nHabilitada     Desconectado    Dedicado         Wi-Fi", aclaracion: "Cada fila corresponde a una interfaz; lee sus columnas de izquierda a derecha:", detalles: [
    ["Habilitada", " es el estado administrativo: la interfaz está activada."],
    ["Conectado / Desconectado", " indica el estado de conexión. Ethernet aparece conectado y Wi-Fi desconectado: estar habilitada no garantiza estar conectada."],
    ["Dedicado", " es el tipo que muestra la tabla para ambas interfaces."],
    ["Ethernet / Wi-Fi", " son los nombres de las interfaces en este equipo."]
  ] },
  "windows-getmac": { sistema: "Windows CMD", comando: "getmac", resultado: "Dirección física    Nombre de transporte\n=================== ==========================================================\n02-AA-BB-CC-DD-EE   \\Device\\Tcpip_{12345678-1234-5678-9ABC-123456789ABC}", aclaracion: "La dirección física 02-AA-BB-CC-DD-EE es la MAC de la interfaz, no una dirección IP. Cada interfaz de red puede tener una MAC diferente." },
  "windows-getmac-v": { sistema: "Windows CMD", comando: "getmac /v", resultado: "Nombre de conexión  Adaptador de red       Dirección física    Nombre de transporte\n=================== ====================== =================== ====================\nEthernet            Adaptador Ethernet     02-AA-BB-CC-DD-EE   \\Device\\Tcpip_{12345678-1234-5678-9ABC-123456789ABC}", aclaracion: "La variante /v relaciona la conexión Ethernet y su adaptador con la MAC 02-AA-BB-CC-DD-EE. Cada interfaz puede tener una MAC diferente." },
  "linux-ip-route": { sistema: "Linux", comando: "ip route", resultado: "default via 192.168.1.1 dev enp0s3 proto dhcp metric 100\n192.168.1.0/24 dev enp0s3 proto kernel scope link src 192.168.1.50 metric 100", aclaracion: "Las dos rutas muestran cómo salir hacia otras redes o alcanzar directamente la red local:", detalles: [
    ["default via 192.168.1.1", " es la ruta predeterminada: envía el tráfico a la puerta de enlace cuando no existe una ruta más específica."],
    ["192.168.1.0/24 dev enp0s3", " es la red local conectada directamente; el tráfico hacia ella sale por enp0s3 sin pasar por una puerta de enlace."]
  ] },
  "linux-resolvectl-status": { sistema: "Linux", comando: "resolvectl status", resultado: "Global\n       Protocols: -LLMNR -mDNS -DNSOverTLS\n\nLink 2 (enp0s3)\n    Current Scopes: DNS\nCurrent DNS Server: 192.168.1.1\n       DNS Servers: 192.168.1.1", aclaracion: "Esta consulta muestra la configuración, pero no comprueba que un nombre se resuelva correctamente. Funciona en sistemas que utilizan systemd-resolved, no necesariamente en todas las distribuciones:", detalles: [
    ["Link 2 (enp0s3)", " identifica la interfaz a la que corresponde la configuración."],
    ["Current DNS Server", " indica el servidor DNS utilizado actualmente: 192.168.1.1."],
    ["DNS Servers", " muestra los servidores disponibles para la interfaz. En este ejemplo coincide con la puerta de enlace, aunque no tiene por qué ser así."]
  ] },
  "linux-ip-addr-add": { sistema: "Linux", comando: "sudo ip addr add 192.168.1.50/24 dev enp0s3", resultado: "", aclaracion: "El cambio es temporal y sudo permite ejecutar el comando con permisos administrativos:", detalles: [
    ["192.168.1.50/24", " indica la dirección IPv4; /24 equivale a la máscara 255.255.255.0."],
    ["dev enp0s3", " identifica la interfaz del ejemplo que recibe la dirección."],
    ["ip addr add", " añade una dirección, pero no elimina necesariamente las anteriores."]
  ] },
  "windows-netsh-ip-static": { sistema: "Windows CMD", comando: "netsh interface ip set address \"Ethernet\" static 192.168.1.50 255.255.255.0 192.168.1.1", resultado: "", aclaracion: "Esta instrucción configura varios parámetros a la vez. Puede ser necesario abrir CMD como administrador:", detalles: [
    ["Ethernet", " identifica el adaptador del ejemplo."],
    ["192.168.1.50", " es la dirección IPv4 y 255.255.255.0 es su máscara."],
    ["192.168.1.1", " es la puerta de enlace."]
  ] },
  "linux-ip-route-replace": { sistema: "Linux", comando: "sudo ip route replace default via 192.168.1.1 dev enp0s3", resultado: "", aclaracion: "sudo aporta permisos administrativos. La ruta es temporal y la interfaz debe tener previamente una configuración IP compatible con la puerta de enlace:", detalles: [
    ["default", " indica la ruta predeterminada."],
    ["via 192.168.1.1", " identifica la puerta de enlace."],
    ["dev enp0s3", " indica la interfaz utilizada."]
  ] },
  "linux-resolvectl-dns": { sistema: "Linux", comando: "sudo resolvectl dns enp0s3 1.1.1.1", resultado: "", aclaracion: "El comando requiere systemd-resolved y sudo para los permisos administrativos; no modifica de forma permanente el perfil de red:", detalles: [
    ["enp0s3", " es la interfaz del ejemplo."],
    ["1.1.1.1", " es el servidor DNS configurado. Establecerlo no comprueba que funcione."]
  ] },
  "windows-netsh-dns": { sistema: "Windows CMD", comando: "netsh interface ip set dns \"Ethernet\" static 1.1.1.1", resultado: "", aclaracion: "Puede ser necesario abrir CMD como administrador. Configurar un servidor DNS no comprueba que funcione:", detalles: [
    ["Ethernet", " identifica el adaptador del ejemplo."],
    ["static", " indica que la configuración es manual."],
    ["1.1.1.1", " es el servidor DNS configurado."]
  ] },
  "linux-nmcli-ipv4": { sistema: "Linux", comando: "sudo nmcli con mod \"Conexión cableada 1\" ipv4.method manual ipv4.addresses 192.168.1.50/24", resultado: "", aclaracion: "NetworkManager guarda estos parámetros en el perfil indicado; es un nombre de ejemplo y no necesariamente el de la interfaz:", detalles: [
    ["ipv4.method manual", " selecciona IPv4 estática en el perfil."],
    ["ipv4.addresses 192.168.1.50/24", " guarda la dirección y su prefijo; /24 equivale a 255.255.255.0."],
    ["nmcli con up", " permite activar de nuevo la conexión para aplicar el perfil guardado."]
  ] },
  "linux-nmcli-gateway": { sistema: "Linux", comando: "sudo nmcli con mod \"Conexión cableada 1\" ipv4.gateway 192.168.1.1", resultado: "", aclaracion: "NetworkManager guarda el cambio en el perfil de ejemplo, que debe tener una IPv4 compatible:", detalles: [
    ["ipv4.gateway 192.168.1.1", " establece la puerta de enlace del perfil."],
    ["nmcli con up", " activa de nuevo la conexión para aplicar el cambio."]
  ] },
  "linux-nmcli-dns": { sistema: "Linux", comando: "sudo nmcli con mod \"Conexión cableada 1\" ipv4.dns \"1.1.1.1\" ipv4.ignore-auto-dns yes", resultado: "", aclaracion: "NetworkManager guarda la configuración DNS en el perfil; activa de nuevo la conexión para aplicarla:", detalles: [
    ["ipv4.dns \"1.1.1.1\"", " guarda el servidor DNS manual."],
    ["ipv4.ignore-auto-dns yes", " si IPv4 se obtiene automáticamente, hace que se ignoren los servidores DNS recibidos por ese medio."]
  ] },
  "linux-nmcli-up": { sistema: "Linux", comando: "sudo nmcli con up \"Conexión cableada 1\"", resultado: "Conexión activada con éxito (ruta activa D-Bus: /org/freedesktop/NetworkManager/ActiveConnection/2)", aclaracion: "NetworkManager activa de nuevo el perfil y aplica los parámetros guardados. La reconexión puede interrumpir temporalmente la red." },
  "linux-nmcli-auto": { sistema: "Linux", comando: "sudo nmcli con mod \"Conexión cableada 1\" ipv4.method auto", resultado: "", aclaracion: "NetworkManager guarda ipv4.method auto en el perfil para obtener IPv4 automáticamente, normalmente mediante DHCP. Reactiva la conexión para aplicarlo; los DNS manuales no vuelven necesariamente a ser automáticos." },
  "windows-netsh-dhcp": { sistema: "Windows CMD", comando: "netsh interface ip set address \"Ethernet\" dhcp", resultado: "", aclaracion: "Ethernet es el adaptador y dhcp activa la obtención automática de IPv4. La configuración DNS se gestiona por separado; activar DHCP no es lo mismo que solicitar manualmente una renovación." },
  "linux-link-up": { sistema: "Linux", comando: "sudo ip link set enp0s3 up", resultado: "", aclaracion: "up habilita administrativamente enp0s3. Eso no garantiza que tenga una IPv4 válida ni acceso a Internet." },
  "linux-link-down": { sistema: "Linux", comando: "sudo ip link set enp0s3 down", resultado: "", aclaracion: "down deshabilita administrativamente enp0s3 y puede interrumpir inmediatamente la conexión." },
  "windows-link-up": { sistema: "Windows CMD", comando: "netsh interface set interface \"Ethernet\" enabled", resultado: "", aclaracion: "enabled habilita el adaptador Ethernet, pero puede seguir desconectado o no tener acceso a Internet." },
  "windows-link-down": { sistema: "Windows CMD", comando: "netsh interface set interface \"Ethernet\" disabled", resultado: "", aclaracion: "disabled deshabilita el adaptador Ethernet y puede cortar la conectividad." },
  "linux-nmcli-down": { sistema: "Linux", comando: "sudo nmcli con down \"Conexión cableada 1\"", resultado: "Conexión «Conexión cableada 1» desactivada correctamente (ruta activa D-Bus: /org/freedesktop/NetworkManager/ActiveConnection/2)", aclaracion: "con down desactiva el perfil y puede interrumpir la conexión. Al reactivarlo con con up, si usa DHCP, puede obtener de nuevo parámetros automáticos; esto no equivale exactamente a release y renew." },
  "windows-ipconfig-release": { sistema: "Windows CMD", comando: "ipconfig /release \"Ethernet\"", resultado: "Configuración IP de Windows\n\nAdaptador de Ethernet Ethernet:\n\n   Dirección IPv4. . . . . . . . . . . . : 0.0.0.0\n   Máscara de subred . . . . . . . . . . : 0.0.0.0\n   Puerta de enlace predeterminada . . . . :", aclaracion: "/release libera la concesión DHCP IPv4 de Ethernet. No deshabilita físicamente la interfaz; la conectividad IPv4 puede interrumpirse hasta obtener otra configuración." },
  "windows-ipconfig-renew": { sistema: "Windows CMD", comando: "ipconfig /renew \"Ethernet\"", resultado: "Configuración IP de Windows\n\nAdaptador de Ethernet Ethernet:\n\n   Dirección IPv4. . . . . . . . . . . . : 192.168.1.50\n   Máscara de subred . . . . . . . . . . : 255.255.255.0\n   Puerta de enlace predeterminada . . . . : 192.168.1.1", aclaracion: "/renew solicita una concesión DHCP para Ethernet. El servidor puede asignar la misma IPv4, como aquí, u otra diferente; esto no activa físicamente la interfaz." },
  "linux-flush-dns": { sistema: "Linux", comando: "sudo resolvectl flush-caches", resultado: "", aclaracion: "Se vacían las respuestas DNS almacenadas por systemd-resolved. No cambian los servidores DNS configurados ni se garantiza que se resuelva un problema de conectividad." },
  "windows-flush-dns": { sistema: "Windows CMD", comando: "ipconfig /flushdns", resultado: "Configuración IP de Windows\n\nSe vació correctamente la caché de resolución de DNS.", aclaracion: "Se vacían las respuestas almacenadas por el cliente DNS de Windows; las siguientes consultas pueden necesitar resolverse de nuevo. No cambian la IP, la puerta de enlace ni los servidores DNS configurados." },
  "linux-ping": { sistema: "Linux", comando: "ping 192.168.1.1", resultado: "PING 192.168.1.1 (192.168.1.1) 56(84) bytes of data.\n64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.732 ms\n64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.681 ms\n64 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=0.705 ms\n^C\n--- 192.168.1.1 ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss, time 2003ms\nrtt min/avg/max/mdev = 0.681/0.706/0.732/0.021 ms", aclaracion: "Observa el resultado de la prueba:", detalles: [
    ["192.168.1.1", " es el destino, el router local de este ejemplo."],
    ["time", " muestra el tiempo de ida y vuelta en milisegundos."],
    ["^C", " representa Ctrl+C: sin un límite, ping continúa hasta interrumpirlo."],
    ["3 transmitted, 3 received, 0% packet loss", " indica que se enviaron y recibieron tres solicitudes, sin pérdida. Si no hay respuesta, podría deberse a filtrado de ICMP, no necesariamente a que el equipo esté apagado."]
  ] },
  "linux-ping-count": { sistema: "Linux", comando: "ping -c 4 192.168.1.1", resultado: "PING 192.168.1.1 (192.168.1.1) 56(84) bytes of data.\n64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.732 ms\n64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.681 ms\n64 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=0.705 ms\n64 bytes from 192.168.1.1: icmp_seq=4 ttl=64 time=0.722 ms\n\n--- 192.168.1.1 ping statistics ---\n4 packets transmitted, 4 received, 0% packet loss, time 3004ms\nrtt min/avg/max/mdev = 0.681/0.710/0.732/0.019 ms", aclaracion: "La prueba termina por sí sola:", detalles: [
    ["-c 4", " limita el envío a cuatro solicitudes hacia 192.168.1.1."],
    ["time", " indica el tiempo de respuesta en milisegundos."],
    ["4 transmitted, 4 received, 0% packet loss", " indica cuatro envíos y cuatro respuestas, sin pérdida. La ausencia de respuesta también puede deberse a filtrado de ICMP."]
  ] },
  "windows-ping": { sistema: "Windows CMD", comando: "ping 192.168.1.1", resultado: "Haciendo ping a 192.168.1.1 con 32 bytes de datos:\nRespuesta desde 192.168.1.1: bytes=32 tiempo<1ms TTL=64\nRespuesta desde 192.168.1.1: bytes=32 tiempo<1ms TTL=64\nRespuesta desde 192.168.1.1: bytes=32 tiempo<1ms TTL=64\nRespuesta desde 192.168.1.1: bytes=32 tiempo<1ms TTL=64\n\nEstadísticas de ping para 192.168.1.1:\n    Paquetes: enviados = 4, recibidos = 4, perdidos = 0 (0% perdidos),\nTiempos aproximados de ida y vuelta en milisegundos:\n    Mínimo = 0ms, Máximo = 0ms, Media = 0ms", aclaracion: "Observa las respuestas y el resumen:", detalles: [
    ["192.168.1.1", " es el destino, el router local del ejemplo."],
    ["tiempo<1ms", " indica que la respuesta tardó menos de un milisegundo."],
    ["enviados = 4, recibidos = 4, perdidos = 0", " muestra las cuatro solicitudes que Windows envía por defecto y que no hubo pérdidas. Si no hay respuesta, también puede existir filtrado de ICMP."]
  ] },
  "linux-traceroute": { sistema: "Linux", comando: "traceroute ejemplo.com", resultado: "traceroute to ejemplo.com (203.0.113.10), 30 hops max, 60 byte packets\n 1  192.168.1.1  0.732 ms  0.681 ms  0.705 ms\n 2  192.0.2.1  8.214 ms  8.506 ms  8.671 ms\n 3  198.51.100.1  16.352 ms  *  17.112 ms\n 4  203.0.113.10  24.108 ms  24.213 ms  24.420 ms", aclaracion: "Cada fila representa un salto del recorrido:", detalles: [
    ["1  192.168.1.1", " es el primer salto, normalmente el router de la red local."],
    ["ms", " indica el tiempo de respuesta de cada prueba."],
    ["*", " indica que una prueba no recibió respuesta a tiempo; no demuestra por sí sola que la ruta haya fallado."],
    ["203.0.113.10", " es el destino simulado; las direcciones públicas utilizadas están reservadas para documentación."]
  ] },
  "windows-tracert": { sistema: "Windows CMD", comando: "tracert ejemplo.com", resultado: "Traza a la dirección ejemplo.com [203.0.113.10]\nsobre un máximo de 30 saltos:\n\n  1    <1 ms    <1 ms    <1 ms  192.168.1.1\n  2     8 ms     8 ms     9 ms  192.0.2.1\n  3    16 ms        *    17 ms  198.51.100.1\n  4    24 ms    24 ms    25 ms  203.0.113.10\n\nTraza completa.", aclaracion: "Cada fila representa un salto del recorrido:", detalles: [
    ["1  192.168.1.1", " es el primer salto, normalmente el router de la red local."],
    ["ms", " muestra el tiempo de respuesta de cada prueba."],
    ["*", " significa que una prueba no recibió respuesta a tiempo; no demuestra por sí sola que la ruta haya fallado."],
    ["203.0.113.10", " es el destino simulado; las direcciones públicas utilizadas están reservadas para documentación."]
  ] },
  "linux-ip-neigh": { sistema: "Linux", comando: "ip neigh", resultado: "192.168.1.1 dev enp0s3 lladdr 02:aa:bb:cc:dd:01 REACHABLE\n192.168.1.20 dev enp0s3 lladdr 02:aa:bb:cc:dd:02 STALE", aclaracion: "La tabla relaciona vecinos conocidos con sus direcciones de enlace:", detalles: [
    ["192.168.1.1 y 02:aa:bb:cc:dd:01", " son la dirección IP y la MAC del router local."],
    ["REACHABLE", " indica que el vecino se ha confirmado accesible recientemente; STALE indica que la información necesita una nueva confirmación."],
    ["ip neigh", " también puede incluir vecinos IPv6. La caché contiene información aprendida, no un inventario completo de la red."]
  ] },
  "windows-arp": { sistema: "Windows CMD", comando: "arp -a", resultado: "Interfaz: 192.168.1.50 --- 0x6\n  Dirección de Internet  Dirección física      Tipo\n  192.168.1.1            02-aa-bb-cc-dd-01     dinámico\n  192.168.1.20           02-aa-bb-cc-dd-02     dinámico", aclaracion: "La tabla muestra asociaciones ARP de IPv4 aprendidas por el equipo:", detalles: [
    ["192.168.1.50", " es la dirección de la interfaz local usada para estas entradas."],
    ["192.168.1.1 y 02-aa-bb-cc-dd-01", " relacionan la IP del router local con su dirección MAC."],
    ["dinámico", " señala una entrada aprendida. La caché no es un inventario completo; ip neigh en Linux también puede incluir vecinos IPv6."]
  ] },
  "linux-dig": { sistema: "Linux", comando: "dig ejemplo.com", resultado: "; <<>> DiG 9.18.30 <<>> ejemplo.com\n;; global options: +cmd\n;; Got answer:\n;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345\n;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1\n\n;; OPT PSEUDOSECTION:\n; EDNS: version: 0, flags:; udp: 1232\n\n;; QUESTION SECTION:\n;ejemplo.com.                   IN      A\n\n;; ANSWER SECTION:\nejemplo.com.            300     IN      A       203.0.113.10\n\n;; Query time: 12 msec\n;; SERVER: 192.168.1.1#53(192.168.1.1) (UDP)", aclaracion: "La consulta de ejemplo ha recibido una respuesta:", detalles: [
    ["QUESTION SECTION", " identifica el nombre consultado, ejemplo.com, y el tipo A solicitado por defecto."],
    ["ANSWER SECTION", " muestra el registro A que relaciona el nombre con la IPv4 203.0.113.10."],
    ["SERVER: 192.168.1.1", " identifica el servidor DNS consultado; NOERROR indica que la consulta se procesó sin error."]
  ] },
  "linux-nslookup-stage4": { sistema: "Linux", comando: "nslookup ejemplo.com", resultado: "Server:         192.168.1.1\nAddress:        192.168.1.1#53\n\nNon-authoritative answer:\nName:   ejemplo.com\nAddress: 203.0.113.10", aclaracion: "Distingue el servidor DNS de la respuesta:", detalles: [
    ["Server: 192.168.1.1", " es el servidor consultado, no la dirección del dominio."],
    ["Name: ejemplo.com", " es el nombre solicitado; la respuesta lo relaciona con la IPv4 203.0.113.10."]
  ] },
  "windows-nslookup-stage4": { sistema: "Windows CMD", comando: "nslookup ejemplo.com", resultado: "Servidor:  router.local\nAddress:  192.168.1.1\n\nRespuesta no autoritativa:\nNombre:  ejemplo.com\nAddress:  203.0.113.10", aclaracion: "Distingue el servidor DNS de la respuesta:", detalles: [
    ["Servidor: router.local", " identifica el servidor consultado, cuya dirección es 192.168.1.1."],
    ["Nombre: ejemplo.com", " es el nombre solicitado; la respuesta lo relaciona con la IPv4 203.0.113.10."]
  ] },
  "linux-dig-mx": { sistema: "Linux", comando: "dig ejemplo.com MX", resultado: "; <<>> DiG 9.18.30 <<>> ejemplo.com MX\n;; global options: +cmd\n;; Got answer:\n;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12346\n;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1\n\n;; OPT PSEUDOSECTION:\n; EDNS: version: 0, flags:; udp: 1232\n\n;; QUESTION SECTION:\n;ejemplo.com.                   IN      MX\n\n;; ANSWER SECTION:\nejemplo.com.            300     IN      MX      10 correo.ejemplo.com.\n\n;; Query time: 12 msec\n;; SERVER: 192.168.1.1#53(192.168.1.1) (UDP)", aclaracion: "En la respuesta de ejemplo:", detalles: [
    ["MX", " es el tipo de registro consultado para el correo de ejemplo.com."],
    ["10 correo.ejemplo.com.", " muestra la preferencia y el nombre del servidor de correo, no una dirección IP."],
    ["SERVER: 192.168.1.1", " identifica el servidor DNS consultado."]
  ] },
  "linux-dig-a": { sistema: "Linux", comando: "dig ejemplo.com A", resultado: "; <<>> DiG 9.18.30 <<>> ejemplo.com A\n;; global options: +cmd\n;; Got answer:\n;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12347\n;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1\n\n;; OPT PSEUDOSECTION:\n; EDNS: version: 0, flags:; udp: 1232\n\n;; QUESTION SECTION:\n;ejemplo.com.                   IN      A\n\n;; ANSWER SECTION:\nejemplo.com.            300     IN      A       203.0.113.10\n\n;; Query time: 12 msec\n;; SERVER: 192.168.1.1#53(192.168.1.1) (UDP)", aclaracion: "En ANSWER SECTION, el registro A relaciona ejemplo.com con la IPv4 203.0.113.10. SERVER identifica el servidor DNS consultado: 192.168.1.1." },
  "windows-nslookup-mx": { sistema: "Windows CMD", comando: "nslookup -type=MX ejemplo.com", resultado: "Servidor:  router.local\nAddress:  192.168.1.1\n\nRespuesta no autoritativa:\nejemplo.com    MX preference = 10, mail exchanger = correo.ejemplo.com", aclaracion: "La respuesta MX indica el servidor de correo correo.ejemplo.com y su preferencia 10. La dirección 192.168.1.1 corresponde al DNS consultado, no al servidor de correo." },
  "windows-nslookup-a": { sistema: "Windows CMD", comando: "nslookup -type=A ejemplo.com", resultado: "Servidor:  router.local\nAddress:  192.168.1.1\n\nRespuesta no autoritativa:\nNombre:  ejemplo.com\nAddress:  203.0.113.10", aclaracion: "La respuesta A relaciona ejemplo.com con la IPv4 203.0.113.10. La otra dirección, 192.168.1.1, corresponde al servidor DNS consultado." },
  "linux-ss-conexiones": { sistema: "Linux", comando: "ss -tun", resultado: "Netid State  Recv-Q Send-Q Local Address:Port    Peer Address:Port\ntcp   ESTAB  0      0      192.168.1.50:49152   203.0.113.10:443\ntcp   ESTAB  0      0      192.168.1.50:49153   192.0.2.20:80", aclaracion: "Cada fila muestra una comunicación TCP:", detalles: [
    ["Local Address:Port", " indica la dirección local 192.168.1.50 y el puerto utilizado en el equipo."],
    ["Peer Address:Port", " identifica la dirección y el puerto remoto; por ejemplo, 203.0.113.10:443."],
    ["ESTAB", " indica una conexión establecida. Este comando no incluye los sockets en escucha."]
  ] },
  "windows-netstat-stage4": { sistema: "Windows CMD", comando: "netstat -ano", resultado: "Conexiones activas\n\n  Proto  Dirección local          Dirección remota         Estado           PID\n  TCP    0.0.0.0:22               0.0.0.0:0                LISTENING        1234\n  TCP    192.168.1.50:49152       203.0.113.10:443         ESTABLISHED      4560\n  UDP    0.0.0.0:5353             *:*                                       2340", aclaracion: "Cada fila muestra un socket y el proceso asociado:", detalles: [
    ["Dirección local y Dirección remota", " indican los extremos y sus puertos. La conexión de 192.168.1.50:49152 llega a 203.0.113.10:443."],
    ["ESTABLISHED", " indica una conexión TCP establecida; LISTENING indica un puerto TCP preparado para recibir conexiones."],
    ["UDP", " no muestra los mismos estados de conexión TCP. PID identifica el proceso asociado a cada fila."]
  ] },
  "linux-ss-puertos": { sistema: "Linux", comando: "ss -tuln", resultado: "Netid State  Recv-Q Send-Q Local Address:Port  Peer Address:Port\nudp   UNCONN 0      0      0.0.0.0:5353       0.0.0.0:*\ntcp   LISTEN 0      128    0.0.0.0:22         0.0.0.0:*", aclaracion: "Observa el protocolo y el puerto local:", detalles: [
    ["tcp LISTEN", " indica que el puerto TCP 22 está preparado para recibir conexiones."],
    ["udp UNCONN", " muestra el puerto UDP 5353 enlazado; UDP no tiene un estado de escucha equivalente al de TCP."],
    ["0.0.0.0", " indica que el socket está disponible en las direcciones IPv4 locales. El número de puerto orienta, pero no garantiza qué aplicación lo utiliza."]
  ] },
  "windows-route-print": { sistema: "Windows CMD", comando: "route print", resultado: "Tabla de rutas IPv4\n===========================================================================\nRutas activas:\nDestino de red    Máscara de red    Puerta de acceso    Interfaz       Métrica\n        0.0.0.0          0.0.0.0        192.168.1.1    192.168.1.50       100\n    192.168.1.0    255.255.255.0         En vínculo    192.168.1.50       100\n===========================================================================\n[Fragmento simplificado]", aclaracion: "Cada fila indica cómo alcanzar un destino IPv4:", detalles: [
    ["Destino de red y Máscara de red", " identifican la red. El destino 0.0.0.0 con máscara 0.0.0.0 representa la ruta predeterminada, 0.0.0.0/0."],
    ["Puerta de acceso", " indica el siguiente salto: 192.168.1.1. En vínculo significa que la red local se alcanza directamente."],
    ["Interfaz", " muestra la IPv4 local 192.168.1.50 por la que sale el tráfico."]
  ] }
};

// Las salidas compartidas se explican según la función desde la que se abren.
const enfoquesDemostraciones = {
  "puertos-windows": { aclaracion: "La misma tabla incluye puertos y conexiones:", detalles: [
    ["TCP 0.0.0.0:22 LISTENING", " identifica un puerto TCP preparado para recibir conexiones en las direcciones IPv4 locales."],
    ["UDP 0.0.0.0:5353", " es un puerto UDP enlazado; no aparece un estado de escucha TCP."],
    ["ESTABLISHED", " indica una conexión TCP ya establecida, distinta de un puerto en espera."],
    ["PID", " identifica el proceso asociado; el número de puerto por sí solo no garantiza qué aplicación lo utiliza."]
  ] },
  "mac-linux": { aclaracion: "En enp0s3, el campo link/ether muestra la dirección MAC 02:11:22:33:44:55." },
  "puerta-linux": { aclaracion: "En la ruta predeterminada, observa:", detalles: [
    ["default", " se usa cuando no existe una ruta más específica."],
    ["via 192.168.1.1", " identifica la puerta de enlace."],
    ["dev enp0s3", " indica la interfaz por la que se envía el tráfico."]
  ] },
  "puerta-windows": { aclaracion: "En Ethernet, la puerta de enlace predeterminada es 192.168.1.1. Permite enviar tráfico hacia otras redes." },
  "dns-windows": { aclaracion: "Servidores DNS indica dónde envía el ordenador sus consultas de nombres. Aquí es 192.168.1.1, igual que la puerta de enlace: en redes domésticas el router puede reenviar consultas DNS, aunque ambas direcciones no tienen por qué coincidir. Esta consulta no comprueba que la resolución funcione." },
  "dhcp-linux": { aclaracion: "con up reactiva el perfil; si utiliza DHCP, puede negociar de nuevo los parámetros automáticos. La conectividad puede interrumpirse durante el proceso. Reactivar un perfil no equivale exactamente a release y renew." }
};

const dialogoDemo = document.querySelector(".demo-dialog");
if (dialogoDemo) {
  const titulo = dialogoDemo.querySelector("#demo-title");
  const etiquetas = dialogoDemo.querySelector(".demo-tags");
  const subtitulo = dialogoDemo.querySelector(".demo-caption");
  const cierre = dialogoDemo.querySelector(".demo-close");
  const terminal = dialogoDemo.querySelector(".demo-terminal");
  const contenido = dialogoDemo.querySelector(".demo-content");
  const prompt = dialogoDemo.querySelector(".demo-prompt");
  const escrito = dialogoDemo.querySelector(".demo-typed");
  const salida = dialogoDemo.querySelector(".demo-output");
  const promptFinal = dialogoDemo.querySelector(".demo-final-prompt");
  const resumen = dialogoDemo.querySelector("#demo-accessible-output");
  const descripcion = dialogoDemo.querySelector("#demo-description");
  const textoDescripcion = descripcion.querySelector(".demo-description-text, span");
  let temporizador = null;
  let activador = null;
  let medidaActual = null;

  function ajustarAncho(demo, simbolo, simboloFinal) {
    const estiloTerminal = getComputedStyle(terminal);
    const estiloContenido = getComputedStyle(contenido);
    const estiloDialogo = getComputedStyle(dialogoDemo);
    const contexto = document.createElement("canvas").getContext("2d");
    if (!contexto) return;
    contexto.font = [estiloTerminal.fontStyle, estiloTerminal.fontWeight, estiloTerminal.fontSize, estiloTerminal.fontFamily].join(" ");
    const lineas = ((demo.historial || "") + simbolo + demo.comando + "_\n" + demo.resultado + "\n" + simboloFinal).split("\n");
    const textoMasAncho = Math.max(...lineas.map((linea) => contexto.measureText(linea).width));
    const espacios = [estiloTerminal.paddingLeft, estiloTerminal.paddingRight, estiloContenido.paddingLeft, estiloContenido.paddingRight, estiloDialogo.borderLeftWidth, estiloDialogo.borderRightWidth]
      .reduce((suma, valor) => suma + (parseFloat(valor) || 0), 0);
    dialogoDemo.style.setProperty("--ancho-terminal", Math.ceil(textoMasAncho + espacios + 2) + "px");
  }

  function detenerAnimacion() {
    clearTimeout(temporizador);
    temporizador = null;
    escrito.classList.remove("cursor-visible");
  }

  function abrirDemostracion(boton) {
    const demoBase = demostraciones[boton.dataset.demo];
    if (!demoBase || dialogoDemo.open) return;
    const enfoque = enfoquesDemostraciones[boton.dataset.contexto];
    const demo = enfoque ? { ...demoBase, detalles: undefined, ...enfoque } : demoBase;
    detenerAnimacion();
    activador = boton;
    const simbolo = demo.promptInicial || (demo.sistema === "Linux" ? "alumno@pc-aula:~$ " : "C:\\Users\\Alumno> ");
    const simboloFinal = demo.promptFinal || simbolo;
    titulo.textContent = demo.comando;
    const nota = boton.nextElementSibling;
    subtitulo.textContent = nota && nota.classList.contains("command-note") ? nota.textContent.trim() : "";
    subtitulo.hidden = !subtitulo.textContent;
    etiquetas.replaceChildren();
    const etiquetaSistema = boton.closest(".system-command").querySelector(".tag");
    const fila = boton.closest(".function-row");
    const etiquetaFinalidad = fila ? fila.querySelector("h3 .purpose") : null;
    if (etiquetaSistema) etiquetas.append(etiquetaSistema.cloneNode(true));
    if (etiquetaFinalidad) etiquetas.append(etiquetaFinalidad.cloneNode(true));
    descripcion.hidden = true;
    textoDescripcion.textContent = "";
    dialogoDemo.classList.toggle("demo-description-expanded", Array.isArray(demo.detalles));
    resumen.textContent = "Comando: " + demo.comando + (demo.limpiar ? ". Se limpia la pantalla y aparece un nuevo prompt: " + simboloFinal : (demo.resultado ? ". Resultado simulado: " + demo.resultado : ". Sin salida.") + (demo.promptFinal ? " Nuevo prompt: " + simboloFinal : ""));
    terminal.classList.toggle("windows-terminal", demo.sistema === "Windows CMD");
    prompt.textContent = (demo.historial || "") + simbolo;
    escrito.textContent = "";
    salida.textContent = "";
    promptFinal.textContent = "";
    medidaActual = { demo, simbolo, simboloFinal };
    ajustarAncho(demo, simbolo, simboloFinal);
    terminal.scrollLeft = 0;
    if (boton.closest("#direcciones, #enlace, #dns, #configurar, #dhcp, #conectividad, #recorrido, #vecinos, #conexiones, #puertos")) {
      terminal.scrollTop = 0;
      dialogoDemo.scrollTop = 0;
    }
    dialogoDemo.showModal();
    cierre.focus();

    function mostrarResultado() {
      escrito.classList.remove("cursor-visible");
      if (demo.limpiar) {
        prompt.textContent = "";
        escrito.textContent = "";
      }
      salida.textContent = demo.resultado;
      promptFinal.textContent = simboloFinal;
      if (typeof demo.aclaracion === "string" && demo.aclaracion.trim()) {
        textoDescripcion.textContent = demo.aclaracion;
        if (Array.isArray(demo.detalles)) {
          const lista = document.createElement("ul");
          demo.detalles.forEach(([termino, explicacion]) => {
            const elemento = document.createElement("li");
            const codigo = document.createElement("code");
            codigo.textContent = termino;
            elemento.append(codigo, document.createTextNode(explicacion));
            lista.append(elemento);
          });
          textoDescripcion.append(lista);
        }
        descripcion.hidden = false;
      }
      temporizador = null;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      escrito.textContent = demo.comando;
      mostrarResultado();
      return;
    }
    let posicion = 0;
    let cambiosCursor = 0;
    function parpadearCursor() {
      if (!dialogoDemo.open) return;
      if (cambiosCursor === 6) {
        mostrarResultado();
        return;
      }
      escrito.classList.toggle("cursor-visible", cambiosCursor % 2 === 0);
      cambiosCursor++;
      temporizador = setTimeout(parpadearCursor, 250);
    }
    function escribir() {
      if (!dialogoDemo.open) return;
      escrito.textContent = demo.comando.slice(0, ++posicion);
      if (posicion < demo.comando.length) temporizador = setTimeout(escribir, 50);
      else parpadearCursor();
    }
    temporizador = setTimeout(escribir, 50);
  }

  document.querySelectorAll("#entorno [data-demo], #navegar [data-demo], #organizar [data-demo], #ayuda [data-demo], #direcciones [data-demo], #enlace [data-demo], #dns [data-demo], #configurar [data-demo], #dhcp [data-demo], #conectividad [data-demo], #recorrido [data-demo], #vecinos [data-demo], #conexiones [data-demo], #puertos [data-demo]").forEach((boton) => {
    boton.addEventListener("click", () => abrirDemostracion(boton));
  });
  cierre.addEventListener("click", () => dialogoDemo.close());
  window.addEventListener("resize", () => {
    if (dialogoDemo.open && medidaActual) ajustarAncho(medidaActual.demo, medidaActual.simbolo, medidaActual.simboloFinal);
  });
  dialogoDemo.addEventListener("click", (evento) => {
    if (evento.target === dialogoDemo) dialogoDemo.close();
  });
  dialogoDemo.addEventListener("close", () => {
    detenerAnimacion();
    medidaActual = null;
    if (activador && activador.isConnected) activador.focus();
    activador = null;
  });
}
