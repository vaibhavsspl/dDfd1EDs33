/**
 * Created by 23rd and Walnut
 * www.23andwalnut.com
 * User: Saleem El-Amin
 * Date: 6/8/11
 * Time: 9:39 AM
 */
 var myPlaylist =[];
function getMusicList(callback){
		var featureRelId = getUrlVars()['transferId'];
		var userSiteId =  getUrlVars()['touchId'];
		var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
	
		var url = baseUrl+'web/web/getMusicPlayer/'+featureRelId+'/'+userSiteId;
		var data = '';

 doAjaxCall(url,data,false,function(html){  
		  if($.isEmptyObject(html)){
		 
		   $('#main-content').html('Sorry we have an Empty data');
		  }else{
		   var backGroundColor,textColor;
		   var mobileBackground='';
		   var tintColor='';
		   var headerimage='';
		   
		   $.each(html,function(i,item){
				mobileBackground  = item.mobileBackground;	
				tintColor  = item.tintColor;	
				headerimage  = item.headerimage;	
			var	myPlayli = 	 {
									mp3:item.track_url,
									title:item.title,
									artist:item.artist,
									buy:item.Pur_url,
									cover:item.album_art_image
								};		
				// alert(myPlayli);
				 myPlaylist.push(myPlayli);
				 })
				callback();
				
				$('body').css({ 'background-image': 'url(" ' + baseUrl + mobileBackground + '")' });
				$('body').css({ 'color': '#'+tintColor });
				if(headerimage !='' && headerimage !=null){
				$('#main-content #header-image').html('<img src="'+baseUrl+headerimage+'"  height="100" width="100%"/>');
				}
	  }
		  
		  })	
}


	
