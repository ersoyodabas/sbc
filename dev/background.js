ls = {};
loc = {};


(async function() {
    chrome.storage.local.get(['sbcsolver'], function(data) {
        ls = data.sbcsolver;
        ls.lang = ls.lang === undefined ? 'en' : ls.lang;
        backgroundMounted();
    });
})();


async function backgroundMounted() {
    try {

        if(!document.querySelector(".futweb")){
            alert('EN : Please try again after logging fifa web companion platform. \n TR : Lütfen  fifa web companion hesabınıza giriş yaptıktan sonra tekrar deneyiniz.');
        }

        postParams = {};
        postParams.lang = ls.lang;
        let res = await postData(ls.api_url + '/api/staticData/getScripts', postParams);

        // styles
        res.data.css.forEach(element => {
            document.querySelector(".futweb").insertAdjacentHTML('beforeend', '<style>' + element + '</style>');
        });


        //varsa yok et
        if (document.getElementById('modal-membership-expired')) {
            document.getElementById('modal-membership-expired').remove();
        };
        if (document.getElementById('contolTopPanel')) {
            document.getElementById('contolTopPanel').remove();
        };
        if (document.getElementById('controlPanel')) {
            document.getElementById('controlPanel').remove();
        };
        if (document.getElementById('actionsModal')) {
            document.getElementById('actionsModal').remove();
        };

        if (document.getElementById('errorBox')) {
            document.getElementById('errorBox').remove();
        };


        res.data.html.forEach(row => {
            document.querySelector(".futweb").insertAdjacentHTML('beforeend', row);
        });

        var evalData = '';
        res.data.js.forEach(row => {
            evalData += " \n  \n " + row;
        });


        eval(evalData);

    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        const [, lineno, colno] = error.stack.match(/(\d+):(\d+)/);
        console.log('Line:', lineno);
        console.log('Column:', colno);
        console.log('ERROR => ', error);


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
            'Authorization': 'Bearer' + ls.token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match Content-Type header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}