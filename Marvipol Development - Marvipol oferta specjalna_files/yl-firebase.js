//for communication between opened new window
var source = null;
var origin = null;

if (localStorage.getItem('openerOrigin') !== null) {
    origin = JSON.parse(localStorage.getItem('openerOrigin'));
    source = window.opener;
}

function receiveMessage(event) {
    source = event.source;
    origin = event.origin;
    if (origin) {
        localStorage.setItem('openerOrigin', JSON.stringify(origin));
    }
}

if (typeof window.opener !== 'undefined' && window.opener !== null) {

    window.addEventListener("message", receiveMessage, false);
}
var url;

var cookies = {
    get: function (name) {
        var thisCookie = name + '=';
        var allCookies = document.cookie.split(';');
        for (var i = 0; i < allCookies.length; i++) {
            var cookie = allCookies[i];
            while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
            if (cookie.indexOf(thisCookie) == 0) return cookie.substring(thisCookie.length, cookie.length);
        }
        return null;
    },
    getDomainName: function (url) {
        var TLDs = ["lubin", "warszawa", "katowice", "wroclaw", "lublin", "gda", "waw", "local", "ac", "ad", "ae", "aero", "af", "ag", "ai", "al", "am", "an", "ao", "aq", "ar", "arpa", "as", "asia", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "biz", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "cat", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "com", "coop", "cr", "cu", "cv", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "edu", "ee", "eg", "er", "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gov", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "info", "int", "io", "iq", "ir", "is", "it", "je", "jm", "jo", "jobs", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mg", "mh", "mil", "mk", "ml", "mm", "mn", "mo", "mobi", "mp", "mq", "mr", "ms", "mt", "mu", "museum", "mv", "mw", "mx", "my", "mz", "na", "name", "nc", "ne", "net", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "org", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "pro", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "shop", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "st", "su", "sv", "sy", "sz", "tc", "td", "tel", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tp", "tr", "travel", "tt", "tv", "tw", "tz", "ua", "ug", "uk", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "xn--0zwm56d", "xn--11b5bs3a9aj6g", "xn--3e0b707e", "xn--45brj9c", "xn--80akhbyknj4f", "xn--90a3ac", "xn--9t4b11yi5a", "xn--clchc0ea0b2g2a9gcd", "xn--deba0ad", "xn--fiqs8s", "xn--fiqz9s", "xn--fpcrj9c3d", "xn--fzc2c9e2c", "xn--g6w251d", "xn--gecrj9c", "xn--h2brj9c", "xn--hgbk6aj7f53bba", "xn--hlcj6aya9esc7a", "xn--j6w193g", "xn--jxalpdlp", "xn--kgbechtv", "xn--kprw13d", "xn--kpry57d", "xn--lgbbat1ad8j", "xn--mgbaam7a8h", "xn--mgbayh7gpa", "xn--mgbbh1a71e", "xn--mgbc0a9azcg", "xn--mgberp4a5d4ar", "xn--o3cw4h", "xn--ogbpf8fl", "xn--p1ai", "xn--pgbs0dh", "xn--s9brj9c", "xn--wgbh1c", "xn--wgbl6a", "xn--xkc2al3hye2a", "xn--xkc2dl3a5ee0h", "xn--yfro4i67o", "xn--ygbi2ammx", "xn--zckzah", "xxx", "ye", "yt", "za", "zm", "zw"].join();
        var parts = url.split('.'),
            ln = parts.length,
            i = ln,
            minLength = parts[parts.length - 1].length,
            part,
            tail = '';

        while (part = parts[--i]) {
            if (TLDs.indexOf(part) < 0 || part.length < minLength || i < ln - 2 || i === 0) {
                return part + tail;
            }
            tail = '.' + part + tail;
        }
    },
    save: function (name, value, validForMs, encrypt) {
        var expiryDate = new Date();

        expiryDate.setTime(expiryDate.getTime() + validForMs);

        var domain = window.location.host;
        if (domain.indexOf(":") > -1)
            domain = domain.substring(0, domain.indexOf(":"));
        domain = cookies.getDomainName(domain);

        var cookie = name + '=';
        cookie += value;
        cookie += '; expires=' + expiryDate.toGMTString();
        cookie += '; domain=.' + domain;
        cookie += '; path=/';
        document.cookie = cookie;
    },
    expiration: 10 * 365 * 24 * 60 * 60 * 1000
};

try {
    url = new URL(window.location.href);

} catch (err) {
    url = {
        searchParams: {
            get: function () {
                return 'm-' + youleadId + 'youlead.pl';
            }
        }
    };
}

var settings = {
    url: {
        baseUrl: function () {
            var ylId;
            if (typeof youleadId === 'undefined') {
                youleadName = url.host.split('.')[0];
                ylId = youleadName.indexOf('m-') == 0 ? youleadName : 'm-' + youleadName;
            } else {
                ylId = youleadId.indexOf('m-') == 0 ? youleadId : 'm-' + youleadId;
            }
            return ('https:' == document.location.protocol ? 'https://' : 'http://') + ylId + '.youlead.pl';
        },
        //baseUrl: function () { return 'http://localhost:58795' },
        wpCookies: function () {
            return settings.url.baseUrl() + '/Webpush.ashx';
        }
    },
    cookieNames: {
        site: 'ylid',
        webpush: 'ylwp',
        session: 'ylssid'
    }
};

function initializeFirebase() {
    if (webpush.initialized === false) {
        webpush.initialize();
    }

    if (url.searchParams.get('nohttps')) {
        var swPath = '';
        if (url.searchParams.get('swPath')) {
            swPath = url.searchParams.get('swPath');
        }
        if (Notification.permission !== 'denied') {
            webpush.requestPermission(true, swPath);
        } else {
            if (window.location.href.toLocaleLowerCase().indexOf('webpushblocked') === -1) {
                window.location.href = "https://m-nyl4.youlead.pl/WebPushBlocked.html";
            }
        }
    }
}

var currentToken = '';
try {
    indexedDB.databases().then(function (bases) {
        return bases.find(function (base) {
            return base.name === 'fcm_token_details_db';
        });
    }).then(function (fcbBase) {
        if (fcbBase) {
            var request = window.indexedDB.open("fcm_token_details_db");
            request.onsuccess = function (event) {
                var db = event.target.result;
                var r = db.transaction('fcm_token_object_Store').objectStore('fcm_token_object_Store').openCursor();
                r.onsuccess = function (event) {
                    var fcmStore = event.target.result;
                    if (fcmStore) {
                        currentToken = fcmStore.value.fcmToken ? fcmStore.value.fcmToken : '';
                    }
                };
                r.onerror = function (event) {
                    console.error(event);
                };

            };
        }
    });
} catch (err) {
    currentToken = '';
}

var firebaseAppUrl = 'https://www.gstatic.com/firebasejs/5.9.2/firebase-app.js';
var firebaseMessagingUrl = 'https://www.gstatic.com/firebasejs/5.9.2/firebase-messaging.js';
//check if requirejs is used (requirejs problem with annonymous define function)
if (typeof define === 'function') {
    firebaseAppUrl = settings.url.baseUrl() + '/firebase-app.js';
    firebaseMessagingUrl = settings.url.baseUrl() + '/firebase-messaging.js';
}
if (typeof firebase === 'undefined') {
    loadScripts(firebaseAppUrl, false, function () {
        loadScripts(firebaseMessagingUrl, false, function () {
            initializeFirebase();

        });
    });
} else {
    if (typeof firebase.messaging === 'undefined') {
        loadScripts(firebaseMessagingUrl, false, function () {
            initializeFirebase();
        });
    } else {
        initializeFirebase();
    }
}

var needWindow = 0;

function checkSW() {
    var c = needWindow;
    if (c === 0) {
        setTimeout(checkSW, 500);
        return;
    } else if (needWindow === 3) {
        openNewWindow();
        return;
    }
}

var openNewWindow = function () {

    var userAgent = navigator.userAgent,
        mobile = function () {
            return /\b(iPhone|iP[ao]d)/.test(userAgent) ||
                /\b(iP[ao]d)/.test(userAgent) ||
                /Android/i.test(userAgent) ||
                /Mobile/i.test(userAgent);
        },
        screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
        outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.documentElement.clientWidth,
        targetWidth = mobile() ? null : 400,
        V = screenX < 0 ? window.screen.width + screenX : screenX,
        left = parseInt(V + (outerWidth - targetWidth) / 2, 10),
        features = [];

    if (targetWidth !== null) {
        features.push('width=' + targetWidth);
    }

    features.push('height=' + 400);
    features.push('left=' + left);
    var browserId = cookies.get('ylid') ? cookies.get('ylid').replace('browserId=', '') : cookies.get('ylsid').replace('browserId=', '');
    var sessionId = cookies.get(settings.cookieNames.session) ? cookies.get(settings.cookieNames.session) : url.searchParams.get('sessionId');
    var newWindow = window.open(settings.url.baseUrl() + '/WebpushWindow.html?nohttps=true&' + sessionId + '&ylid=' + browserId, 'MsgWindow', features.join(','));

    return newWindow;
};

function saveNegativeCookie(nohttps) {
    loadScripts(settings.url.wpCookies() + '?actionId=2&consent=0', true, function () {
        if (window.location.href.toLowerCase().indexOf('webpushwindow.html') !== -1 || window.location.href.toLowerCase().indexOf('webpushblocked') !== -1) {
            setTimeout(function () {
                if (source) {
                    source.postMessage("no consent", origin);
                    close();
                }

                window.close();
            }, 500);
        } else {
            cookies.save('ylwp', 0, cookies.expiration);
        }
    });
}

function savePositiveCookie(nohttps, action, token, oldToken) {
    loadScripts(settings.url.wpCookies() + '?actionId=2&consent=1', true, function () {
        if (window.location.href.toLowerCase().indexOf('webpushwindow.html') !== -1 || window.location.href.toLowerCase().indexOf('webpushblocked') !== -1) {
            if (action == 21) {

                loadScripts('/track?' + cookies.get('ylsid') + '&sessionId=' + url.searchParams.get('sessionId') + '&actionId=21&token=' + token + '&oldToken=' + oldToken, false, function () {
                    window.close();
                });
            } else {
                loadScripts('/track?' + cookies.get('ylsid') + '&sessionId=' + url.searchParams.get('sessionId') + '&actionId=' + action + '&token=' + token, false, function () {
                    if (source) {
                        source.postMessage("subscribe " + token, origin);
                        setTimeout(function () {
                            close();
                            window.close();
                        }, 500);
                    }
                });
            }

        } else {
            cookies.save('ylwp', 1, cookies.expiration);

            if (action == 21) {

                Monitor.TrackPushTokenRefresh(token, oldToken);
            } else {

                Monitor.TrackPushSubscription(token);
            }
        }
    });
}

var webpush = {
    initialize: function () {
        var config = {
            apiKey: "AIzaSyC-6c0X7sElZi4uTmvj6UrKwW0PfP1PWIs",
            authDomain: "youlead-78ae7.firebaseapp.com",
            databaseURL: "https://youlead-78ae7.firebaseio.com",
            projectId: "youlead-78ae7",
            storageBucket: "youlead-78ae7.appspot.com",
            messagingSenderId: "665398046414"
        };
        firebase.initializeApp(config);
        this.initialized = true;
        try {
            if (!messaging) {
                var messaging = firebase.messaging();
            }
        } catch (err) {
            if (/https:/i.test(location.protocol)) {
                saveNegativeCookie(true);

            }
            return;
        }
        messaging.onTokenRefresh(function () {
            var oldToken = '';
            var request = window.indexedDB.open("fcm_token_details_db");
            request.onsuccess = function (event) {
                var db = event.target.result;
                var r = db.transaction('fcm_token_object_Store').objectStore('fcm_token_object_Store').openCursor();
                r.onsuccess = function (event) {
                    var fcmStore = event.target.result;
                    if (fcmStore) {
                        oldToken = fcmStore.value.fcmToken ? fcmStore.value.fcmToken : '';
                    }
                };
                r.onerror = function (event) {
                    console.error(event);
                };

            };

            messaging.getToken().then(function (refreshedToken) {
                savePositiveCookie(nohttps, 21, refreshedToken, oldToken);

            }, function (err) {
                saveNegativeCookie(nohttps);
            });
        });
    },
    requestPermission: function (nohttps, swPath, instantRequest) {
        try {
            if (!messaging) {
                var messaging = firebase.messaging();
            }
        } catch (err) {
            saveNegativeCookie(nohttps);
            return;
        }
        if (nohttps && Notification.permission === "denied") {
            saveNegativeCookie(nohttps);
        }

        function swRegister(registration) {
            messaging.useServiceWorker(registration);
            needWindow = 2;
            messaging.requestPermission()
                .then(function () {
                    return messaging.getToken();
                })
                .then(function (token) {
                    if (instantRequest) {
                        ylData.push({
                            'event': {
                                'eventName': 'WebPushPromptAgree'
                            }
                        });
                    }

                    if (currentToken === '' || currentToken === token) {
                        savePositiveCookie(nohttps, 18, token);
                    } else {

                        savePositiveCookie(nohttps, 21, token, currentToken);
                    }
                    currentToken = token;

                }, function (err) {

                    if (instantRequest) {
                        ylData.push({
                            'event': {
                                'eventName': 'WebPushPromptDisagree'
                            }
                        });
                    }
                    saveNegativeCookie(nohttps);
                    if (source) {
                        source.postMessage('blocked', origin);
                    }
                    //console.log('Unable to get permission to notify. ', err);
                });
        }
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function (registrations) {
                for (var registration of registrations) {
                    if (registration.active.scriptURL === window.location.origin + swPath + '/sw.js' || registration.active.scriptURL === window.location.origin + '/sw.js') {
                        return true;
                    }
                }
            }).then(function (registered) {
                if (!registered) {
                    checkSW();
                    swPath = swPath ? swPath.replace(/\/$/, '').replace('/sw.js', '') : '';
                    navigator.serviceWorker.register(swPath + '/sw.js')
                        .then(function (registration) {
                            swRegister(registration);
                        }, function (err) {
                            navigator.serviceWorker.register('/yl-sw.js')
                                .then(function (registration) {
                                    swRegister(registration);
                                }, function (err) {
                                    console.error(err);
                                    if (err.toString().indexOf('The operation is insecure.') !== -1) {
                                        saveNegativeCookie(nohttps);
                                    } else {
                                        needWindow = 3;
                                    }
                                });
                        });
                } else {
                    if (window.location.href.toLocaleLowerCase().indexOf('webpushblocked') !== -1) {
                        navigator.serviceWorker.getRegistrations().then(function (registrations) {
                            for (var registration of registrations) {
                                if (registration.scope === window.location.origin + swPath + '/' || registration.scope === window.location.origin + '/') {
                                    return registration;
                                }
                            }
                        }).then(function (reg) {
                            swRegister(reg);
                        });
                    } else {
                        if (Notification.permission === 'default') {
                            Notification.requestPermission().then(function (permission) {
                                if (permission === 'granted') {
                                    sendToken(nohttps);
                                    if (instantRequest) {
                                        ylData.push({
                                            'event': {
                                                'eventName': 'WebPushPromptAgree'
                                            }
                                        });
                                    }
                                } else if (permission === 'denied') {
                                    saveNegativeCookie(nohttps);
                                    if (instantRequest) {
                                        ylData.push({
                                            'event': {
                                                'eventName': 'WebPushPromptDisagree'
                                            }
                                        });
                                    }
                                }
                            });
                        } else if (Notification.permission === 'granted') {
                            sendToken(nohttps);
                        }

                    }

                }

            });
        }
    },
    initialized: false
};

function sendToken(nohttps) {
    var request = window.indexedDB.open("fcm_token_details_db");

    request.onsuccess = function (event) {
        var db = event.target.result;
        try {
            var r = db.transaction('fcm_token_object_Store').objectStore('fcm_token_object_Store').openCursor();
            r.onsuccess = function (event) {
                var fcmStore = event.target.result;
                if (fcmStore) {
                    var token = fcmStore.value.fcmToken;
                    savePositiveCookie(nohttps, 18, token);
                }
            };
            r.onerror = function (event) {
                console.error(event);
            };
        } catch (err) {
            // catch error with self-removed indexedDB
        }

    };
}

function loadScripts(url, async, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = async;
    script.src = url;

    // waiting for server response
    if (script.readyState) { // IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" ||
                script.readyState == "complete") {
                script.onreadystatechange = null;

                callback();
            }
        };
    } else { // Others
        script.onload = function (data) {
            callback();
        };
    }

    document.head.appendChild(script);

}
