window.translate = [];
// Set your language value here
var language = 'nl';

if (language == 'auto'){
	language = navigator.language;
}

window.language = language;

function loadScript(url){
	$LAB.script(url);
}

_t = function(module, param){				//Global function translate
	return window.translate[module][param];
};

var langUrls = [
	'config',
	'whapps/accounts/accounts_manager',
	'whapps/auth/auth',
	'whapps/auth/onboarding',
	'whapps/call_center/dashboard',
	'whapps/call_center/queue',
	'whapps/core/layout',
	'whapps/core/linknav',
	'whapps/core/whappnav',
	'whapps/developer/api',
	'whapps/myaccount/app_store',
	'whapps/myaccount/billing',
	'whapps/myaccount/credits',
	'whapps/myaccount/myaccount',
	'whapps/myaccount/nav',
	'whapps/myaccount/personal_info',
	'whapps/myaccount/report',
	'whapps/myaccount/statistics',
	'whapps/numbers/numbers_manager',
	'whapps/pbxs/pbxs_manager',
	'whapps/userportal/portal_manager',
	'whapps/voip/account',
	'whapps/voip/bulk',
	'whapps/voip/callflow',
	'whapps/voip/cdr',
	'whapps/voip/conference',
	'whapps/voip/device',
	'whapps/voip/directory',
	'whapps/voip/featurecode',
	'whapps/voip/groups',
	'whapps/voip/media',
	'whapps/voip/menu',
	'whapps/voip/queue',
	'whapps/voip/registration',
	'whapps/voip/resource',
	'whapps/voip/timeofday',
	'whapps/voip/user',
	'whapps/voip/vmbox',
	'whapps/voip/voip'
];

function loadLanguages(language) {
	for(var i = 0; i < langUrls.length; i++){
	 	 loadScript(langUrls[i]+'/lang/'+language+'.js');
	}
}

loadLanguages('en');

if(window.language !== 'en') {
	loadLanguages(window.language);
}

$LAB.script('config/config.js')
	.wait()
	.script('config/loadFavicon.js');


