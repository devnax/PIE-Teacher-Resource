<?php

/**
 * Plugin Name: PIE Teacher
 * Description: PIE Teacher Resources
 * Plugin URI:  https://fb.com/devnax
 * Version:     1.0.0
 * Author:      Naxrul Ahmed
 * Author URI:  https://fb.com/devnax
 * License:     GPL2
 * Text Domain: pie-teacher
 * Domain Path: /languages
 */


if ( ! defined( 'ABSPATH' )) {
	exit; // Exit if accessed directly.
}


/**
 * Load the autoloader
 */
include __DIR__.'/vendor/autoload.php';

use DevNax\PIETeacher\Keys as Keys;


final class PIETeacherResources{


    private static $keys = null;


    /**
     * initial the Plugin
     */
    static function init(){
        if(defined("PT_INIT")){
            return;
        }
        self::consts();
        Keys::init();
        self::actions();

    }

    

    /**
     * Plugin Constans
     */
    private static function consts(){
        define('PT_INIT', true );
        define('PT_VERSION', '1.1.0' );
        define('PT_SCRIPT_VERSION', rand() );
        define('PT_TXTDOMAIN', 'nx-login' );
        define('PT_DIR', __DIR__ );
        define('PT_URL', plugin_dir_url( __FILE__ ) );
        define('PT_ADMIN_URI', PT_URL.'/admin' );
        define('PT_ADMIN_DIR', PT_DIR.'/admin' );
        define('PT_FRONTEND_DIR', PT_DIR.'/frontend' );
        define('PT_FRONTEND_URI', PT_URL.'/frontend' );
        define('PT_ASSETS_URI', PT_URL.'/assets' );
    }



    /**
     * Global Actions
     */
    private static function actions(){
        

        /**
         * Loaded hook
         */
        add_action( 'plugins_loaded',  Keys::$names->plugin_launch);

        /**
         * Adding action links
         */
        add_action( 'plugin_action_links_' . plugin_basename( __FILE__ ), Keys::$names->plugin_action_link );

        /*
		 * Activation Plugin Hook
		 */
		register_activation_hook( __FILE__, Keys::$names->plugin_active );

		/*
		 * Uninstall Plugin Hook
		 */
		register_deactivation_hook( __FILE__, Keys::$names->plugin_deactive );

		/*
		 * Uninstall Plugin Hook
		 */
		register_uninstall_hook( __FILE__, Keys::$names->plugin_uninstall );
    }


}




/**
 * Start the plugin 
 */
PIETeacherResources::init();

