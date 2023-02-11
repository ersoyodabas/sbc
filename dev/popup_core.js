let popup = {
	data: {
			//api_url : 'https://futmasterapp.com',
				api_url: 'http://localhost:5000',
			email: '',
			password: '',
			facebook_contat_url: 'http://m.me/sbcsolver',
			login_model: { email: '', password: '', lang: 'en', version: '21.3' },
			ls: {},
			loc: {},
	},
	methods: {
			async getPopupHtml() {
					let self = this;
					let res = await self.getData(popup.data.api_url + '/api/staticData/popup?lang=' + popup.data.ls.lang);


					// let res = await response.json();
					if (res.result) {
							document.querySelector("#popUpBody").innerHTML = res.data.html[0];
							document.querySelector("#popUpBody").insertAdjacentHTML('beforeend', '<style>' + res.data.css[0] + '</style>');
							popup.data.loc = JSON.parse(res.data.js_loc);
							//set localization data


							//bind control titles
							document.getElementById('lblLogin').innerHTML = popup.data.loc.login.login;
							document.getElementById('lblContact').innerHTML = popup.data.loc.login.contact;
							document.getElementById('lblDownloadNewVersion').innerHTML = popup.data.loc.login.download_new_version;

							$("#closeIcon").click(function() {
									$('#errorBox').attr('hidden', true);
							});


							$("#aContact").click(function() {
									$('#errorBox').attr('hidden', true);
									window.open(popup.data.facebook_contat_url, '_blank').focus();
							});




							$("#aLogin").click(function() {
									self.login();
									
							});


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
					} else {}
			},
			async login() {
					let self = this;
					let res;

					
					popup.data.login_model.email = document.getElementById("userEmail").value;
					popup.data.login_model.password = document.getElementById("userPassword").value;

					if (!popup.data.login_model.email || !popup.data.login_model.password) {
							//Hata mesajını yazdır
							document.querySelector('#errorBox > span').innerHTML = 'email and password ?';
							$('#errorBox').attr('hidden', false);

							//Hata mesajını ekrandan kaldır
							setTimeout(() => {
									$('#errorBox').attr('hidden', true);
							}, 3000);

					} else {


							res = await self.postData(popup.data.api_url + '/api/user/login', popup.data.login_model);
							console.log(res);
							// localStorage.setItem('sbcsolver', JSON.stringify(res.data));
							if (res.result) {
									
									popup.data.ls.email = popup.data.login_model.email;
									popup.data.ls.password = popup.data.login_model.password;
									popup.data.ls.token = res.data.token;
									popup.data.ls.user = res.data.user;
									popup.data.ls.menu = res.data.menu;
									popup.data.ls.payment = res.data.payment;

									chrome.storage.local.set({
													sbcsolver: popup.data.ls
															// email: popup.data.login_model.email,
															// password: popup.data.login_model.password,
															// token : res.data.token,
															// member_end_date: res.data.member_end_date,
															// member_left_day: res.data.member_left_day,
															// user_name: res.data.user_name
											},
											function() {});

									chrome.tabs.executeScript(null, { file: 'background.js' });
									window.close();
							} else {
									
									if (res.data) {

											if (res.data.require_new_version) {
													res.message = popup.data.loc.login.alert_old_version;
													$('#aDownloadVersion').attr('hidden', false);
													$('#aDownloadVersion').attr('href', res.data.app_download_link);
													$('#aLogin').attr('hidden', true);
											} else {
													$('#aDownloadVersion').attr('hidden', true);
													$('#aLogin').attr('hidden', false);
											}
									}

									//Hata mesajını yazdır
									document.querySelector('#errorBox > span').innerHTML = res.message;
									$('#errorBox').attr('hidden', false);

									//Hata mesajını ekrandan kaldır
									setTimeout(() => {
											$('#errorBox').attr('hidden', true);
									}, 3000);
							}



					};

			},
			async postData(url = '', data = {}) {
					// Default options are marked with *


					const response = await fetch(url, {
							method: 'POST', // *GET, POST, PUT, DELETE, etc.
							mode: 'cors', // no-cors, *cors, same-origin
							cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
							credentials: 'same-origin', // include, *same-origin, omit
							headers: {
									'Content-Type': 'application/json'
											// 'Authorization': token
											// 'Content-Type': 'application/x-www-form-urlencoded',
							},
							redirect: 'follow', // manual, *follow, error
							referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
							body: JSON.stringify(data) // body data type must match "Content-Type" header
					});
					return response.json(); // parses JSON response into native JavaScript objects
			},
			async getData(pUrl) {
					return new Promise((resolve, reject) => {
							try {

									var myHeaders = new Headers({
											"Content-Type": "text/json"
													// 'Authorization': token,
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
	},
	async mounted() {
			let self = this;
			chrome.storage.local.get(['sbcsolver'], async function(data) {

					//session  boş ise
					if (!data.sbcsolver) {
							popup.data.ls.lang = 'en';
							popup.data.ls.api_url = popup.data.api_url;
							chrome.storage.local.set({ sbcsolver: popup.data.ls }, function() {});
					} else {
							popup.data.ls = data.sbcsolver;
					}
					await popup.methods.getPopupHtml()
			});
	}
}
popup.mounted();


// POPUP SCREEEN OPENED
// chrome.tabs.onActiveChanged.addListener(popup.methods.getPopupHtml());