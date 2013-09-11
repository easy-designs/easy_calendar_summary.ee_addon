<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Easy Calendar Summary
 * 
 * @package		Easy Calendar Summary
 * @author		Aaron Gustafson
 * @copyright	Copyright (c) 2013, Easy Designs, LLC
 * @link 		http://www.objectivehtml.com/authenticate
 * @version		1.0
 * @build		20130910
 */
 
class Easy_calendar_summary_ext {

    var $name			= 'Easy Calendar Summary';
    var $version		= '1.0';
    var $description	= 'Displays a date summary for Solspace’s Calendar date picker';
    var $settings_exist	= 'n';
    var $docs_url		= '';

    var $settings       = array();

    /**
     * Constructor
     *
     * @param   mixed   Settings array or empty string if none exist.
     */
    function __construct( $settings=array() )
    {
        $this->settings = $settings;
		$this->EE =& get_instance();
    }

	/**
	 * cp_js_end
	 * Adds the summary to the page if the conditions are right
	 *
	 * @see http://ellislab.com/expressionengine/user-guide/development/extension_hooks/module/channel/index.html#id4
	 *
	 * @return void
	 */
	function cp_js_end()
	{
		//be courteous to other users of this hook
		$str = $this->EE->extensions->last_call;

		$str .= file_get_contents( 'easy_calendar_summary.js', TRUE );
		
		$css = file_get_contents( 'easy_calendar_summary.css', TRUE );
		$css = str_replace(
			array("\r","\n"),
			'',
			$css
		);
		$css = addslashes( $css );
		
		$this->EE->lang->loadfile('easy_calendar_summary');
		
		// Swap stuff
		$swap = array(
			'styles'		=> $css,
			'dates_title'	=> lang('easy_calendar_summary_dates_title')
		);
		$str = $this->EE->functions->var_swap($str, $swap);
		
		return $str;
	}

	/**
	 * Activate Extension
	 *
	 * This function enters the extension into the exp_extensions table
	 *
	 * @see http://ellislab.com/codeigniter/user-guide/database/index.html for
	 * more information on the db class.
	 *
	 * @return void
	 */
	function activate_extension()
	{
		$this->EE->db->insert(
			'extensions',
			array(
				'class'		=> __CLASS__,
				'method'	=> 'cp_js_end',
				'hook'		=> 'cp_js_end',
				'settings'	=> serialize($this->settings),
				'priority'	=> 10,
				'version'	=> $this->version,
				'enabled'	=> 'y'
		    )
		);
	}
	
	/**
	 * Update Extension
	 *
	 * This function performs any necessary db updates when the extension
	 * page is visited
	 *
	 * @return  mixed   void on update / false if none
	 */
	function update_extension( $current='' )
	{
		if ( $current == '' OR
			 $current == $this->version )
		{
			return FALSE;
		}

		if ($current < '1.0')
		{
			// Update to version 1.0
		}

		$this->EE->db->where('class', __CLASS__);
		$this->EE->db->update(
			'extensions',
			array('version' => $this->version)
		);
	}
	
	/**
	 * Disable Extension
	 *
	 * This method removes information from the exp_extensions table
	 *
	 * @return void
	 */
	function disable_extension()
	{
		$this->EE->db->where('class', __CLASS__);
		$this->EE->db->delete('extensions');
	}
}
# end Easy_calendar_summary_ext

/* End of file ext.easy_calendar_summary.php */ 
/* Location: ./system/expressionengine/third_party/easy_calendar_summary/ext.easy_calendar_summary.php */