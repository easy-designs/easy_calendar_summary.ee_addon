;(function(window,$){

	var	tap_evt = 'click',
	 	$calendar = $('#calendar_fields'),
		$dates, $date;
	
	if ( 'touchend' in window )
	{
		tap_evt = 'touchend';
	}

	if ( $calendar.length > 0 )
	{
		// templates
		$dates = $('<div class="easy-calendar-summary-dates"><strong>{dates_title}</strong><ol/></div>');
		$date = $('<li/>');
		
		$('<style media="screen"/>')
			.text('{styles}')
			.appendTo('head');
		
		// Initialize things
		function init()
		{
			$calendar
				.on( 'change', '[name=interval]', build_list )
				.find( '[name=interval]' )
					.each(function(){
						var e = jQuery.Event( 'change' );
						e.target = this;
						$calendar.trigger(e);
					 });
		}
		$(window).on( 'load', init );
		
		// Build the list holder
		function build_list()
		{
			var $interval = $(this),
				$rule = $interval.closest('.rule'),
				$these_dates = $rule.find('.easy-calendar-summary-dates'),
				interval = $interval.val();
			
			if ( interval != 'select_dates' )
			{
				$these_dates.hide();
			}
			else 
			{
				if ( $these_dates.length === 0 )
				{
					$dates.clone()
						.appendTo( $rule );
				}
				
				// watch!
				$calendar.find('.rule')
					.on( tap_evt, update_dates )
					.triggerHandler( tap_evt );
			}
		}
		
		// update the date list
		function update_dates()
		{
			var $rule = $(this),
				dates = $rule.find('.picker_three').data('values'),
				$these_dates = $rule.find('.easy-calendar-summary-dates'),
				$date_list = $these_dates.find('ol').empty();
				
			// sort the dates numerically
			dates.sort();
				
			// fill it back up
			$(dates).each(function(){
				
				$date.clone()
					.text( this )
					.appendTo( $date_list );
				
			});
		}

	}
	
})(this,jQuery);

//;(function(window,$){
//
//	var	tap_evt = 'click',
//	 	$calendar = $('#calendar_fields'),
//		$dates, $date;
//	
//	if ( 'touchend' in window )
//	{
//		tap_evt = 'touchend';
//	}
//
//	if ( $calendar.length > 0 )
//	{
//		// templates
//		$dates = $('<div class="easy-calendar-summary-dates"><strong>{dates_title}</strong><ol/></div>');
//		$date = $('<li/>');
//		
//		$('<style media="screen"/>')
//			.text('{styles}')
//			.appendTo('head');
//		
//		function update_dates()
//		{
//			console.log('update');
//			var $rule = $(this),
//				dates = $rule.find('.picker_three').data('values'),
//				$these_dates = $rule.find('.easy-calendar-summary-dates'),
//				interval = $rule.find('[name=interval]').val(),
//				$date_list;
//			
//			if ( interval != 'select_dates' )
//			{
//				$these_dates.hide();
//			}
//			else
//			{
//				if ( $these_dates.length === 0 )
//				{
//					$these_dates = $dates.clone()
//										.appendTo( $rule );
//				}
//				
//				// empty the list
//				$date_list = $these_dates.find('ol').empty();
//				
//				// sort the dates numerically
//				dates.sort();
//				
//				// fill it back up
//				$(dates).each(function(){
//					
//					$date.clone()
//						.text( this )
//						.appendTo( $date_list );
//					
//				});
//			}
//		}
//		
//		function add_handlers()
//		{
//			console.log('hi');
//			$calendar.find('.rule')
//				// remove existing
//				//.off( tap_evt + ' change', update_dates )
//				// add new
//				.on( tap_evt + ' change', update_dates );
//		}
//
//		// handle new rules
//		$('#calendar_calendars button').on( tap_evt, add_handlers );
//		
//		// once the page is done loading…
//		$(window).on('load',function(){
//			add_handlers();
//			$calendar.find('.rule')
//				.triggerHandler( tap_evt );
//		});
//		
//	}
//	
//})(this,jQuery);