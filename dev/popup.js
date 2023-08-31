let popup = {
    data: {
        // api_url: 'https://api.sbcsolverapp.com',
        api_url: 'http://localhost:28406',
        email: '',
        password: '',
        // facebook_contat_url: 'http://m.me/sbcsolver',
        login_model: { email: '', password: '', lang: 'en', version: '24.1' },
        ls: {},
        loc: {},
    },
    methods: {
        loaderShow() {
            document.getElementById('loading').hidden = false;
        },

        loaderHide() {
            document.getElementById('loading').hidden = true;
        },

        async getPopupHtml() {
            let self = this;
            console.log(23,popup.data.ls);
            console.log(23,popup.data.user);
            let url = popup.data.api_url + '/api/staticData/popup?email=' + (popup.data.ls.user ? popup.data.ls.user.email:'');
            let res = await self.getData(url);
            console.log(28,res);
            if(!res){return;}

            try {
            document.getElementById('default_bg').hidden = true;
                console.log(27,JSON.stringify(res));
                // let res = await response.json();
                if (document.querySelector("#popUpBody")) {
                    document.querySelector("#popUpBody").innerHTML = res.content.html;
                    document.querySelector("#popUpBody").insertAdjacentHTML('beforeend', '<style>' + res.content.css[0] + '</style>');
                    popup.data.loc = JSON.parse(res.content.js_loc);
                    //set localization data


                    //bind control titles
                    document.getElementById('lblLogin').innerHTML = popup.data.loc.login.login;
                    // document.getElementById('lblContact').innerHTML = popup.data.loc.login.contact;
                    console.log(43,popup.data.loc.login);
                    document.getElementById('lblDownloadNewVersion').innerHTML = popup.data.loc.login.download_new_version;

                    $("#closeIcon").click(function() {
                        $('#errorBox').attr('hidden', true);
                    });


                    // $("#aContact").click(function() {
                    //     $('#errorBox').attr('hidden', true);
                    //     window.open(popup.data.facebook_contat_url, '_blank').focus();
                    // });


                    $("#aLogin").click(function() {
                        self.login();
                        
                    });

                    this.setSocials(res.socials);

                    document.getElementById("userEmail").value = popup.data.ls.email == undefined ? '' : popup.data.ls.email;
                    document.getElementById("userPassword").value = popup.data.ls.password == undefined ? '' : popup.data.ls.password;


                    userEmail.addEventListener("keyup", function(event) {
                        if (event.keyCode === 13) {
                            event.preventDefault();
                            self.login();
                        }
                    });

                    userPassword.addEventListener("keyup", function(event) {
                        if (event.keyCode === 13) {
                            event.preventDefault();
                            self.login();
                        }
                    });

                }
            } catch (error) {
                document.getElementById('default_bg').hidden = false;
                document.getElementById('connecting_desc').innerHTML = error;
            }
        },
        setSocials(pSocial){

            if(!pSocial){return;}

            //Logo
            if(pSocial.social_logo){
                document.getElementById('divLogo').hidden = false;
                document.getElementById("imgLogoCompany").src = pSocial.social_logo;
                document.getElementById("imgLogoCompany").alt = "logo";
            }  
       

            //social icons ( Eger en az 1 sociali varsa social dibi göster)
            if(
                pSocial.social_facebook ||
                pSocial.social_instagram ||
                pSocial.social_telegram ||
                pSocial.social_twitter ||
                pSocial.social_discord ||
                pSocial.social_whatsapp ||
                pSocial.social_youtube 
                ){
                    document.getElementById('socialDiv').hidden = false;

                // Instagram varsa
                if(pSocial.social_instagram){
                    document.getElementById('social_instagram').hidden = false;
                    document.getElementById("social_instagram").href= pSocial.social_instagram;                 
                }

                // Twitter varsa
                if(pSocial.social_twitter){
                    document.getElementById('social_twitter').hidden = false;
                    document.getElementById("social_twitter").href = pSocial.social_twitter;                 
                }

                // Telegram varsa
                if(pSocial.social_telegram){
                    document.getElementById('social_telegram').hidden = false;
                    document.getElementById("social_telegram").href = pSocial.social_telegram;                 
                }

                // Discord varsa
                if(pSocial.social_discord){
                    document.getElementById('social_discord').hidden = false;
                    document.getElementById("social_discord").href = pSocial.social_discord;                 
                }

                // Whatsapp varsa
                if(pSocial.social_whatsapp){
                    document.getElementById('social_whatsapp').hidden = false;
                    document.getElementById("social_whatsapp").href = document.getElementById("social_whatsapp").href.replace("xxxxx",pSocial.social_whatsapp.replace("+",""));                 
                }

                // Youtube varsa
                if(pSocial.social_youtube){
                    document.getElementById('social_youtube').hidden = false;
                    document.getElementById("social_youtube").href = pSocial.social_youtube;                 
                }

                // Facebook varsa
                if(pSocial.social_facebook){
                    document.getElementById('social_facebook').hidden = false;
                    document.getElementById("social_facebook").href = pSocial.social_facebook;                 
                }

                // Website linki varsa
                if(pSocial.website_link){
                    document.getElementById('websiteLink').href = pSocial.website_link;
                }
            }

            

        },
        async login() {
            let self = this;
            let res;

            
            popup.data.login_model.email = document.getElementById("userEmail").value;
            popup.data.login_model.password = document.getElementById("userPassword").value;

            if (!popup.data.login_model.email || !popup.data.login_model.password) {
                //Hata mesajını yazdır
                document.querySelector('#errorBox > span').innerHTML = 'Enter All Informations';
                $('#errorBox').attr('hidden', false);

                //Hata mesajını ekrandan kaldır
                setTimeout(() => {
                    $('#errorBox').attr('hidden', true);
                }, 3000);

            } else {

                self.loaderShow();
                res = await self.postData(popup.data.api_url + '/api/user/loginbot', popup.data.login_model);
                debugger;
                if(!res.result){

                    //Hata mesajını yazdır
                    document.querySelector('#errorBox > span').innerHTML = res.message;
                    $('#errorBox').attr('hidden', false);

                    //Hata mesajını ekrandan kaldır
                    setTimeout(() => {
                        $('#errorBox').attr('hidden', true);
                    }, 3000);  



                    if (res.data&& res.data.require_new_version) {
                        // res.message = popup.data.loc.login.alert_old_version;
                        document.getElementById('aDownloadVersion').hidden = false;
                        document.getElementById('aDownloadVersion').href = res.data.app_download_link;
                        document.getElementById('aLogin').hidden = true;
                    } else {
                        document.getElementById('aDownloadVersion').hidden = true;
                        document.getElementById('aLogin').hidden = false;
                    }

                
                    
                    
                  
                }
               else {
                    popup.data.ls.email = popup.data.login_model.email;
                    popup.data.ls.password = popup.data.login_model.password;

                    popup.data.ls.token = res.data.token;
                    popup.data.ls.user = res.data.user;
                    popup.data.ls.menu = res.data.menu;
                    popup.data.ls.payment = res.data.payment;

                    chrome.storage.local.set({
                        sbcsolver24: popup.data.ls
                                // email: popup.data.login_model.email,
                                // password: popup.data.login_model.password,
                                // token : res.token,
                                // member_end_date: res.member_end_date,
                                // member_left_day: res.member_left_day,
                                // user_name: res.user_name
                        },
                        function() {});
                    chrome.tabs.executeScript(null, { file: 'background.js' });

                    window.close();
                }
                // console.log(res);
                // localStorage.setItem('sbcsolver24', JSON.stringify(res));
                self.loaderHide();
            };

        },
        async postData(pUrl = '', pData = {}) {
			return new Promise((resolve, reject) => {
				fetch(pUrl, {
					method: 'POST', // *GET, POST, PUT, DELETE, etc.
					mode: 'cors', // no-cors, *cors, same-origin
					cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
					credentials: 'same-origin', // include, *same-origin, omit
					headers: {
						'Content-Type': 'application/json',
						'Authorization': "Bearer "+popup.data.ls.token
							// 'Authorization': 'Bearer ' + ""
							// 'Content-Type': 'application/x-www-form-urlencoded',
					},
					redirect: 'follow', // manual, *follow, error
					referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
					body: JSON.stringify(pData) // body data type must match Content-Type header
					// body: (pData) // body data type must match Content-Type header
				})
				.then(function(response){
					if(response.status!==200){
                        response.text().then(res =>{
                            console.log('post error',res);
                            if(res){
                                alert(res);
                            }
                            resolve({});
                        }); 
					} else {
						response.text().then(res =>{
							resolve(JSON.parse(res));
						}); 
					}
				});
			});
		},
        async getData(pUrl) {
            return new Promise((resolve, reject) => {

                    var myHeaders = new Headers({
                        "Content-Type": "text/json",
                        'Authorization': "Bearer "+popup.data.ls.token
                            // 'Authorization': token,
                    });


                    const myRequest = new Request(pUrl, {
                        method: "GET",
                        headers: myHeaders,
                        mode: "cors",
                        cache: "default",
                    });



                    fetch(myRequest)
                    .then((response) => {
                        if(response.status!==200){
                            response.text().then(res =>{
                                console.log('get error',res);
                                if(res){
                                    alert(res);
                                }
                                resolve(res);
                            }); 
                        } else {
                            response.text().then(res =>{
                                resolve(JSON.parse(res));
                            }); 
                        }
                    }).catch((error) => {
                        console.log(323,error)
                    });;
            
            });
        }
    },
    async mounted() {
        let self = this;      

        
        chrome.storage.local.get(['sbcsolver24'], async function(data) {
            //session  boş ise
            if (!data.sbcsolver24) {
                popup.data.ls.lang = 'en';
                popup.data.ls.api_url = popup.data.api_url;
                chrome.storage.local.set({ sbcsolver24: popup.data.ls }, function() {});
            } else {
                popup.data.ls = data.sbcsolver24;
            }

            if(popup.data.ls.lang ==='tr'){
                document.getElementById('connecting').innerHTML = 'Bağlanıyor ... ';
                document.getElementById('connecting_desc').innerHTML = 'Eğer bağlanma işlemi uzun sürerse, lütfe daha sonra tekrar deneyiniz...';
            } else {
                document.getElementById('connecting').innerHTML = 'Connecting ... ';
                document.getElementById('connecting_desc').innerHTML = 'If it takes a long time to connect, please try again later.';
            }

            await popup.methods.getPopupHtml()
        });
    }
}
popup.mounted();


// POPUP SCREEEN OPENED
// chrome.tabs.onActiveChanged.addListener(popup.methods.getPopupHtml());