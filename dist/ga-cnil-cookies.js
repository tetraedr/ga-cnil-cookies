
var cnilGA = {};

cnilGA.dev=false;

cnilGA.bannerOppose = '<div id="cookie-message">'+ 
                            "Vous vous êtes oppos&eacute; au d&eacute;pôt de cookies de mesures d'audience"+
                            'dans votre navigateur'+
                      '</div>';


cnilGA.bannerConsent =
            '<div id="cookie-banner-message">'+

                'Ce site utilise Google Analytics. En continuant &agrave; naviguer, '+
                'vous nous autorisez &agrave; d&eacute;poser un cookie &agrave; des fins de mesure '+
                "d'audience."+

                    ' <a href="javascript:cnilGA.CookieConsent.showInform()" >'+
                    ' En savoir plus ou '+"s'opposer"+
                    '</a>.'+
            '</div>';


cnilGA.bannerInformAsk =
            '<div id="inform-and-consent">'+
            '<div class="gac-title">'+
                '<span><b>Les cookies Google Analytics</b></span>'+
            '</div>'+
            '<div class="gac-body">'+

                'Ce site utilise  des cookies de Google Analytics, '+
                'ces cookies nous aident &agrave; identifier le contenu qui vous interesse le plus '+
                "ainsi qu'&agrave;"+' rep&eacute;rer certains dysfonctionnements. Vos donn&eacute;es de navigations sur ce site sont'+
                'envoy&eacute;es &agrave;  Google Inc'+

            '</div>'+
            '<div class="gac-buttons">'+

                '<button name="'+"S'opposer"+'" '+
                        'onclick="cnilGA.CookieConsent.gaOptout();cnilGA.CookieConsent.hideInform();" '+
                        'id="optout-button" >'+"S'opposer"+
                '</button>'+

                '<button name="cancel" onclick="cnilGA.CookieConsent.hideInform()">'+
                        'Accepter'+
                '</button>'+
            '</div>'+
        '</div>';


cnilGA.start = function(gaProperty){
          
          if(!gaProperty){ console.log('no GA-ID');return false;}

          cnilGA.gaProperty=gaProperty;
          cnilGA.CookieConsent.start();

          window._gaq = window._gaq || [];
          _gaq.push(['_setAccount', gaProperty]);
          _gaq.push(['_trackPageview']);

          (function() {
            var gaScript = document.createElement('script'); gaScript.type = 'text/javascript'; gaScript.async = true;
            gaScript.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + 
            '.google-analytics.com/ga.js';
            var s = document.querySelectorAll('script')[0]; s.parentNode.insertBefore(gaScript, s);
          })();
};






cnilGA.CookieConsent = function() {
    var gaProperty = cnilGA.gaProperty;
    var disableStr = 'ga-disable-' + gaProperty;
    var firstCall = false;

    function getCookieExpireDate() { 
     var cookieTimeout = 33696000000;
     var date = new Date();
     date.setTime(date.getTime()+cookieTimeout);
     var expires = "; expires="+date.toGMTString();
     return expires;
    }


    function checkFirstVisit() {
       var consentCookie =  getCookie('hasConsent'); 
       if ( !consentCookie ) return true;
    }


     function showBanner(){
        var bodytag = document.querySelectorAll('body')[0];
        var div = document.createElement('div');
        div.setAttribute('id','cookie-banner');
      


        div.innerHTML =  cnilGA.bannerConsent ;

        bodytag.insertBefore(div,bodytag.firstChild); 
        document.querySelectorAll('body')[0].className+=' cookiebanner';    
        createInformAndAskDiv();
     }
          
          
    function getCookie(NameOfCookie)  {
        if (document.cookie.length > 0) {        
            begin = document.cookie.indexOf(NameOfCookie+"=");
            if (begin != -1)  {
                begin += NameOfCookie.length+1;
                end = document.cookie.indexOf(";", begin);
                if (end == -1) end = document.cookie.length;
                return unescape(document.cookie.substring(begin, end)); 
            }
         }
        return null;
    }

    function getInternetExplorerVersion() {
      var rv = -1,ua,re;
      if (navigator.appName == 'Microsoft Internet Explorer')  {
            ua = navigator.userAgent;
            re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) !== null)
          rv = parseFloat( RegExp.$1 );
      }  else if (navigator.appName == 'Netscape')  {
            ua = navigator.userAgent;
            re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) !== null)
          rv = parseFloat( RegExp.$1 );
      }
      return rv;
    }

    function askDNTConfirmation() {
        var r = confirm(
        "Le signal DoNotTrack de votre navigateur est activ&eacute;, confirmez vous activer"+
        "la fonction DoNotTrack?");
        return r;
    }

    function notToTrack() {
        if(  
            (navigator.doNotTrack &&
             (navigator.doNotTrack  =='yes' || navigator.doNotTrack=='1')
            ) || 
            (navigator.msDoNotTrack && navigator.msDoNotTrack == '1') 
          ) {

            var isIE = (getInternetExplorerVersion()!=-1);
            if (!isIE){    
                 return true;
            }
            return false;
        }
    }

    function isToTrack() {
        if ( navigator.doNotTrack && (navigator.doNotTrack=='no' || navigator.doNotTrack === 0 )) {
            return true;
        }
    }
       
    function delCookie(name )   {
        var path = ";path=" + "/";
        var hostname = document.location.hostname;
        if (hostname.indexOf("www.") === 0)
            hostname = hostname.substring(4);
        var domain = ";domain=" + "."+hostname;
        var expiration = "Thu, 01-Jan-1970 00:00:01 GMT";       
        document.cookie = name + "=" + path + domain + ";expires=" + expiration;
    }
      
    function deleteAnalyticsCookies() {
        var cookieNames = ["__utma","__utmb","__utmc","__utmt","__utmv","__utmz","_ga","_gat"];
        for (var i=0; i<cookieNames.length; i++)
            delCookie(cookieNames[i]);
    }

    function createInformAndAskDiv() {

        var bodytag = document.querySelectorAll('body')[0];
        var div = document.createElement('div');
        div.setAttribute('id','inform-and-ask');

        div.innerHTML =  cnilGA.bannerInformAsk;

        bodytag.insertBefore(div,bodytag.firstChild); 
    }

      

    function isClickOnOptOut( evt) { 
        return (evt.target.parentNode.id == 'cookie-banner' || 
                evt.target.parentNode.parentNode.id =='cookie-banner' || 
                evt.target.id == 'optout-button');
    }

    function consent(evt) {

        if (!isClickOnOptOut(evt) ) { 
            if ( !clickprocessed) {
                evt.preventDefault();
                document.cookie = 'hasConsent=true; '+ getCookieExpireDate() +' ; path=/'; 
                callGoogleAnalytics();
                clickprocessed = true;
                window.setTimeout(function() {evt.target.click();}, 1000);
            } 
        }
    }

    
    // Tag Google Analytics, tag Universal Analytics
    function callGoogleAnalytics() {
        if (firstCall) return;
        else firstCall = true;
        
    }


    return {
        
        // opt-out   
         gaOptout: function() {
        
            document.cookie = disableStr + '=true;'+ getCookieExpireDate() +' ; path=/';       
            document.cookie = 'hasConsent=false;'+ getCookieExpireDate() +' ; path=/';
            var banner = document.getElementById('cookie-banner');
            console.log(banner);
            if ( banner ) banner.innerHTML = cnilGA.bannerOppose;
            banner.classList.remove('gacnil-hidden');

            window[disableStr] = true;
            deleteAnalyticsCookies();
        
        },

        
         showInform: function() {
            
            var ask = document.getElementById("inform-and-ask");
            ask.classList.add('gacnil-visible');

        },
          
          
         hideInform: function() {

            var ask = document.getElementById("inform-and-ask");
            ask.classList.remove('gacnil-visible');

            var banner = document.getElementById("cookie-banner");
            banner.classList.add('gacnil-hidden');

        },
        
        
        start: function() {
            var consentCookie =  getCookie('hasConsent');
            clickprocessed = false; 
            if (!consentCookie) {
               
                if ( notToTrack() ) { 
                    cnilGA.CookieConsent.gaOptout();
                    alert("You've enabled DNT, we're respecting your choice");
                } else {
                    if (isToTrack() ) { 
                        consent();
                    } else {
                        if (window.addEventListener) { 
                          window.addEventListener("load", showBanner, false);
                          document.addEventListener("click", consent, false);
                        } else {
                          window.attachEvent("onload", showBanner);
                          document.attachEvent("onclick", consent);
                        }
                    }
                }
            } else {
                if (document.cookie.indexOf('hasConsent=false') > -1) 
                    window[disableStr] = true;
                else 
                    window[disableStr] = false;
                    callGoogleAnalytics();
            }
        }
    };

}();




