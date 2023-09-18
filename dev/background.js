ls = {};
loc = {};


(async function() {
    chrome.storage.local.get(['sbcsolver24'], function(data) {
        ls = data.sbcsolver24;
        ls.lang = ls.lang === undefined ? 'en' : ls.lang;
        backgroundMounted();
    });
})();


async function backgroundMounted() {
    try {
        if(!document.querySelector(".futweb")){
            if(ls.lang ==='en'){
                alert('Please try again after logging fifa web companion platform.');
            } else {
                alert(' Lütfen  fifa web companion hesabınıza giriş yaptıktan sonra tekrar deneyiniz.');
            }
            return;
        }

        if(document.getElementById('sbcapp')){
            if(ls.lang ==='en'){
                alert('You have tried to log in to the program before, if you want to log in again, you need to refresh the page with F5. Then you can try to log in again.');
            } else {
                alert('Programa daha önce giriş yapmaya çalışılmış, tekrar giriş yapmak istiyorsanız F5 ile sayfayı yenilemeniz gerekmektedir.Sonrasında tekrar giriş yapmayı deneyebilirsiniz.');
            }
            return;
        }

        let res = await getData(ls.api_url + '/api/staticData/scripts');

        // styles
        res.css.forEach(element => {
            document.querySelector(".futweb").insertAdjacentHTML('beforeend', '<style>' + element + '</style>');
        });


        //varsa yok et
        if (document.getElementById('modal-membership-expired')) {
            document.getElementById('modal-membership-expired').remove();
        };
        if (document.getElementById('top_bar')) {
            document.getElementById('navBar').remove();
        };
        if (document.getElementById('controlPanel')) {
            document.getElementById('controlPanel').remove();
        };
        if (document.getElementById('menuContent')) {
            document.getElementById('menuContent').remove();
        };
        if (document.getElementById('errorBox')) {
            document.getElementById('errorBox').remove();
        };

        // HTML
        document.body.insertAdjacentHTML('beforeend', res.html_app);
        res.html_features.forEach(row => {
            document.getElementById('sbcappfeatures').insertAdjacentHTML('beforeend', row);
        });
        res.html_modals.forEach(row => {
            document.getElementById('sbcmodals').insertAdjacentHTML('beforeend', row);
        });

        

        var evalData = '';
        res.js.forEach(row => {
            evalData += " \n  \n " + row;
        });


        eval(evalData);

    } catch (error) {
        const [, lineno, colno] = error.stack.match(/(\d+):(\d+)/);

        //SHOW ERROR MSG 
        var sub_el = '<div class="Notification negative"><p>Loading Error =>' + error + '</p><span class="icon_close fut_icon"></span></div>';
        document.getElementById("NotificationLayer").insertAdjacentHTML('beforeend', sub_el);

        //HIDE ERROR MSG
        setTimeout(() => {
            var msg_list = document.querySelectorAll('#NotificationLayer > div');
            for (var i = 0; i < msg_list.length; i++) {
                if (msg_list[i]) {
                    msg_list[i].remove();
                }
            }
        }, 3000);
    }
}
async function getData(pUrl) {
    return new Promise((resolve, reject) => {
        try {

            var myHeaders = new Headers({
                "Content-Type": "text/json",
                'Authorization': 'Bearer ' + ls.token,
            });


            const myRequest = new Request(pUrl, {
                method: "GET",
                headers: myHeaders,
                mode: "cors",
                cache: "default",
            });



            fetch(myRequest)
                .then((response) => response.json())
                .then((responseData) => {
                    resolve(responseData);
                });
        } catch (error) {
            reject(error);
        }
    });
}
async function postData(url = '', data = {}) {

    data.token = ls.token;


    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + ls.token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match Content-Type header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
