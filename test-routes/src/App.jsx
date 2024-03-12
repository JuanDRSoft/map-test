import { useEffect } from 'react'

const MapWithDirections = () => {
  const route = [
    { lat: 4.518971, lng: -75.6904 },
    { lat: 4.533674, lng: -75.676212 },
    { lat: 4.539771, lng: -75.678025 },
    { lat: 4.564959, lng: -75.650367 }
  ]

  useEffect(() => {
    // Definir la función initMap en el contexto global
    window.initMap = () => {
      // Coordenadas del centro del mapa
      const center = { lat: 4.5318056527717, lng: -75.691359224942104 }
      // Opciones del mapa
      const mapOptions = {
        zoom: 13,
        center: center
      }
      // Crear el mapa
      const map = new window.google.maps.Map(document.getElementById('map'), mapOptions)

      // Coordenadas del origen y destino de las direcciones
      const origin = route[0]
      const destination = route[route.length - 1]

      // Crear solicitud de direcciones
      const directionsService = new window.google.maps.DirectionsService()

      // Configurar la solicitud de direcciones
      const request = {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        waypoints: route.slice(1, -1).map((e) => {
          return { location: e, stopover: true }
        })
      }

      // Solicitar direcciones
      directionsService.route(request, function (response, status) {
        if (status === 'OK') {
          // Crear un DirectionsRenderer para cada segmento de la ruta
          for (let i = 0; i < response.routes[0].legs.length; i++) {
            const directionsRenderer = new window.google.maps.DirectionsRenderer({
              map: map,
              polylineOptions: {
                strokeColor: 'red', // Color aleatorio
                strokeOpacity: 0.8,
                strokeWeight: 6
              }
            })
            // Mostrar la ruta en el mapa
            directionsRenderer.setDirections(response)
            directionsRenderer.setRouteIndex(i)
          }
        } else {
          // Manejar errores
          console.error('Error al obtener direcciones:', status)
        }
      })
    }

    // Inicializar el mapa
    if (window.google && window.google.maps) {
      window.initMap()
    }
  }, [])

  return <div id="map" style={{ height: '100vh', width: '100%' }}></div>
}

export default MapWithDirections
