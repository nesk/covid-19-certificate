
self.addEventListener('install', function(e) {

    //auto-update!!
    self.skipWaiting();

    e.waitUntil(

        caches.open('covid-19-certificate').then(function(cache) {


            return cache.addAll([

                'index.html',
                'certificate.js',
                'certificate.pdf',
                'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/pdf-lib@1.4.1/dist/pdf-lib.js',
                'https://cdn.jsdelivr.net/npm/signature_pad@2.3.2/dist/signature_pad.min.js',
                'images/logo32.png',
                'images/logo80.png',
                'images/logo192.png',
                'images/logo512.png',

            ]);


        })

    );

});


self.addEventListener('fetch', function(event) {
    event.respondWith(

       caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request).then(function(response) {

          return response
        });
      })

    );
  });

