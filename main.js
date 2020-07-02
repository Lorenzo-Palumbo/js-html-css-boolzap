$(document).ready(function() {


    // BoolzApp con Handlebars
    // #1 RICORDA di linkare la libreria di Handlebars
    // #2 Costruiamo il template in HTML
    // #3 Scelgo nel template dove inserire le variabili {{}}
    var source = $('#messaggio-template').html();              // clono il template messaggio
    var template = Handlebars.compile(source);                 // do in pasto ad Handlebars il template clonato

    // Prendo la funzione con la quale mi creavo i messaggi e la modifico per usarla con Handlebars
    function creaMsg(testoMsg, sentReceived) {
        var datiMessaggio = {                                 // Assemblo in un oggetto il contenuto del messaggio
            testoMessaggio: testoMsg,
            direzione: sentReceived
        };

        var templateMessaggio = template(datiMessaggio);      // Popolo il template di handlebars con il contenuto del messaggio
        $('.right-messages.active').append(templateMessaggio);// faccio l'append del template così popolato
    }


    // ----------------------- FINE AGGIUNTA Handlebars --------------------------


    $('.new-message-inputs').focus(function() {
        // console.log('focus');
        $('.right-footer-icon.f-right i').toggleClass('fa fa-microphone fas fa-paper-plane');
    }).blur(function () {
        // console.log('uscito dal focus');
        $('.right-footer-icon.f-right i').toggleClass('fa fa-microphone fas fa-paper-plane');
    });

    // al Click o alla pressione del teasto enter
    // INVIO MESSAGGIO (funzione)
          // Prendere il valore di input
          // Puliamo il contenuto del input
          // Clone di template --> message
          // sostituire il testo del messaggio a .message-text
          // aggiungo classe sent
          // OPZIONALE : funzione DATE
          // append del messaggio in coda al div .right-messages.active
     $('.right-footer-icon.f-right').click(function() {          // All'evento click
          invioMessaggio();                                      // Avvio la funzione invio Messaggio
     });
     $('.new-message-inputs').keypress(function(event) {         // alla pressione del tasto enter
          if(event.keyCode == 13) {
               invioMessaggio();                                 // avvio la funzione invio Messaggio
          }
     });

     function invioMessaggio() {
          var testoMessaggio = $('.new-message-inputs').val();   // Prendere il valore di input
          if(testoMessaggio.trim().length > 0) {                 // Luigi il censore
               $('.new-message-inputs').val('');                      // Puliamo il contenuto del input
               creaMsg(testoMessaggio, 'sent');
               scroll();
               setTimeout(function() {
                    creaMsg('ok', 'received');
                    scroll();
               }, 1000);
          }
     }

     // Codice oscurato perché l'abbiamo ricreato all'inizio della pagina usando Handlebars
     // function creaMsg(testoMsg, sentReceived) {
     //      var templateMessaggio = $('.template .message').clone();    // Mi creo un template
     //      templateMessaggio.children('.message-text').text(testoMsg);
     //      templateMessaggio.addClass(sentReceived);
     //      $('.right-messages.active').append(templateMessaggio);
     // }

     function scroll() {
          var pixelScroll = $('.right-messages.active').height();
          $('.right-messages.active').scrollTop(pixelScroll);
     }

     // Filtro Contatti
     $('#contacts-filter').keyup(function(event){                               // Osserviamo il contact-filter e quando viene scritto qualcosa avvia il filtro al rilascio del tasto
         var filtroContatti = $(this).val().toLowerCase();                      // Facciamo una foto con il valore dell'input
         $('.contact').each(function() {                                        // cicliamo su OGNUNO dei .contact
             var contatto = $(this).find('.contact-name').text().toLowerCase(); // Variabile con il nome del contatto LOWERCASE
             if(contatto.includes(filtroContatti)) {                            // se il valore dell'input è contenuto nel nome del contatto
                 $(this).show();                                                // Mostra contatto
             } else {                                                           // Altrimenti
                 $(this).hide();                                                // Nascondi contatto
             }
         });
     });

     // Milestone III

     $('.contact').click(function() {                           // osservo se il .contact è stato cliccato
        $('.contact').removeClass('active');                    // eliminare l'active da tutti gli altri Contatti
        $(this).addClass('active');                             // aggiungere l'active a this (.contact cliccato)
        var utenteData = $(this).data('conversazione');         // Facciamo una foto del valore data-conversazione dell'elemento cliccato
        var chatCorrispondente = $('.right-messages[data-conversazione="' + utenteData + '"]'); // Cerco il relativo valore in right-messages
        $('.right-messages').removeClass('active');             // elimino l'active a tutti i right-messages
        chatCorrispondente.addClass('active');                  // nel right-messages giusto aggiungo l'active
        // FINE SELEZIONE CHAT ATTIVA

        // Personalizzazione dell'interfaccia di chat
        var nomeContatto = $(this).find('.contact-name').text();                       // Prendo il nome del contatto sul quale ho cliccato
        $('#header-right-contact-name').text(nomeContatto);                            // Sovrascrivo il Nome del contatto sulla finestra di CHAT
        var srcContatto = $(this).find('.contact-logo').children('img').attr('src');   // Faccio una foto all'attributo src dell'immagine del contatto cliccato
        $('.header-right-logo').children('img').attr('src', srcContatto);
     });

     // Milestone III.B
     $('.right-messages-container').on('click', '.message-options', function() {
        $('.message-options').not(this).siblings('.message-options-panel').removeClass('active');   // Chiudo tutte le finestre .message-options-panel aperte
        $(this).siblings('.message-options-panel').toggleClass('active');                           // Apro la finestra .message-options-panel sulla quale ho cliccato
     });

     $(document).on('click', '.message-destroy', function() {                                       // Osserviamo il document e confrontiamo il click con '.message-destroy'
        $(this).closest('.message').remove();                                                       // Eliminiamo l'antenato .message
     });








     //


});
