;(function(window,$){

	var	tap_evt = 'click',
	 	$calendar = $('#calendar_fields'),
		$dates, $date, $option;
	
	if ( 'touchend' in window )
	{
		tap_evt = 'touchend';
	}

	if ( $calendar.length > 0 )
	{
		// templates
		$dates = $('<div class="easy-calendar-summary-dates"><strong>{dates_title}</strong><ol/></div>')
					// switch the calendar view when a user clicks a date
					.on( tap_evt, 'li', function(){
						var $date = $(this),
							$rule = $date.closest('.rule'),
							$year = $rule.find('.ui-datepicker-year'),
							date = $date.text().split('-'),
							year = parseInt( date[0], 10 ),
							month = parseInt( date[1], 10 ) - 1; // 0 scale

						if ( $year.find('option[value=' + year + ']').length < 1 )
						{
							$option.clone()
								.text( year )
								.appendTo( $year );
						}

						$year.val( year )
							.trigger('change');

						$rule.find('.ui-datepicker-month')
							.val( month )
							.trigger('change');
					} );
		$date = $('<li/>');
		$option = $('<option/>');
		
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
					$these_dates = $dates.clone( true )
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