var accessToken = "1334a46118214cc2a2170fd6923ec722";
    var baseUrl = "https://api.dialogflow.com/v1/";
    $(document).ready(function() {
      setResponse("Hey there! How can I help you?");
      $("#input").keypress(function(event) {
        if (event.which == 13) {
          event.preventDefault();
          send();
          this.value = '';
        }
      });
      $("#rec").click(function(event) {
        switchRecognition();
      });


     
      $("#btn01").click(function(event) 
      {
        setResponse("I'm here to give you answers related to Certifications. What do you want to know?");
        setButton("Certification Courses");
      });
      $("#btn02").click(function(event) 
      {
        setResponse('Looking for Rental Space for one day event?"'); 
        setButton("Classroom");
      });
      $("#btn03").click(function(event) 
      {
        setResponse("Looking for Office Space? Tell me how can I help."); 
        setButton("Office price");
      });
      $("#btn04").click(function(event) 
      {
        setResponse("Hello! Welcome to OFFBEAT Gym. How can I help?"); 
        setButton("Gym Price");
        setButton("Are you real?");
      });
      $("#btn05").click(function(event) 
      {
        setResponse("Seeking information?"); 
      });
      $("#btn06").click(function(event) 
      {
        setResponse("Looking for a stay Hooman? You can ask me questions like 'What is the price of bunker?' || 'What is the price of private room?' "); 
        setButton("Bunker Price");
        setButton("Where do you live?");
      });
      $("#btn07").click(function(event) 
      {
        setResponse('We offer various Fitness & Lifestyle. Which fitness program are you interested in?');
        setButton("Fitness Courses List");
      });
      $("#btn08").click(function(event) 
      {
        setResponse('Hi Hooman! To know about TopCat you may either ask/type a question or press Quick Button. Example questions "What are the rental charges of TopCat?" || "What are the services offered by TopCat?" '); 
        setButton("Services at Topcat");
        setButton("Talk to me");
      });
      $("#btn09").click(function(event) 
      {
        setResponse('Do not panic Hooman! Press a Quick Button. I am here to help you!'); 
        setButton("Call Police");
        setButton("Call Ambulance");
        setButton("Call Fire Brigade");    
      });
      $("#btn10").click(function(event) 
      {
        setResponse("Momo-I-AM is here for you. Tell me what do you want to know?");     
        setButton("Menu");
        setButton("Details");
      });
      $("#btn11").click(function(event) 
      {
        setResponse('HELLO! This is button 11');
      });

    });

// Contact Details : KOLKATA KNOWLEDGE CAMPUS 124 B L Saha Road, Kolkata 700 053 Phone/Fax: +91 33 2403 2300/01 DURGAPUR KNOWLEDGE CAMPUS Arrah, Shibtala Via Muchipara, Durgapur 713 212 Phone/Fax: +91 343 253 3813-15

/*    var isAndroid = /(android)/i.test(navigator.userAgent);
    console.log("android Testing: "+isAndroid);
      if(!isAndroid)
      {
        location.assign("https://www.gilabs.co.in/");
      }
*/
    var recognition;
    function startRecognition() {   
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition ||
      window.msSpeechRecognition)();
      recognition.onstart = function(event) {
        updateRec();
      };
      recognition.onresult = function(event) {
        var text = "";
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
          }
          setInput(text);
        stopRecognition();
      };
      recognition.onend = function() {
        stopRecognition();
      };
      recognition.lang = "en-US";
      recognition.start();
    }
  
    function stopRecognition() {
      if (recognition) {
        recognition.stop();
        console.log("++RecognitionStopped");  
        recognition = null;
      }
      updateRec();
    }
    function switchRecognition() {
      if (recognition) {
        stopRecognition();
      } else {
        startRecognition();
      }
    }
    function setInput(text) {
      $("#input").val(text);
      send();
    }
    function updateRec() {
      $("#rec").text(recognition ? "Stop" : "Speak");
    }
    function send() {
     console.log("++insideSend()_Function"); 
           
            var text = $("#input").val();
            console.log("++ValueofText==>"+text); 
            $('.response').append('<span class="user btm-right">' + '<b>You:</b> '+ text + '</span>\r\n');   

            //conversation.push("Me: " + text + '\r\n');
      $.ajax({
           
        type: "POST",
           
        url: baseUrl + "query?v=20150910",
      //  console.log("++lineAfter_baseUrl");  
        contentType: "application/json; charset=utf-8",
        dataType: "json",
     //   console.log("++lineBefore_headers");  
        headers: {
      //    console.log("++lineBefore_Authorization"); 
          "Authorization": "Bearer " + accessToken
     //     console.log("++Authorization_Done"); 
        },
        data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
        success: function(data) 
                {
                  console.log("++Success");   
                  var respText = data.result.fulfillment.speech;
                  console.log("Respuesta: " + respText);
                  setResponse(respText);
                  responsiveVoice.speak(respText,"Hindi Female");
                  $("#response").stop().animate({ scrollTop: $("#response")[0].scrollHeight}, 1000);
                //  $("#response").scrollTop($("#response").height());
        },
        error: function() {
          console.log("++Error");  
          setResponse("Internal Server Error");
        }
      });
      //setResponse("Thinking...");
    }
    function setResponse(val) {
            $('.response').append('<span class="bot btm-left">' + '<b>Bot:</b> '+ val + '</span>\r\n');
            //conversation.push("AI: " + val + '\r\n<br><br>');
     // $("#response").text(conversation.join(""));
    }

    function setButton(val) {
      $('.response').append('<button class="quickButton" onclick= "setButtonVal(this.innerHTML)">' + val + '</button>\r\n');
            
    }

    function setButtonVal(i) {
      $("#input").val(i);
      send();
    }
    
   // var conversation = [];
    