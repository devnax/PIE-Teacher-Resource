<?php

namespace DevNax\PIETeacher;
use DevNax\PIETeacher\Keys as Keys;


class Admin{

    static function init(){
        // Loading the Admin scripts
        add_action( 'admin_enqueue_scripts', Keys::names('Admin::Scripts') );
        Admin\Menu::init();
        Admin\AjaxHandler::init();
        
    }

    static function Scripts(){


        foreach(Keys::$names->admin_scripts as $keys => $scripts){
            $ext = \explode('.', $scripts['src']);
            
            if(isset($scripts['for-page']) && (!isset($_GET['page']) || $_GET['page'] != $scripts['for-page'])){
                continue;
            }

            if(end($ext) == 'js'){
                wp_enqueue_script( $keys, $scripts['src'], $scripts['dep'], PT_SCRIPT_VERSION, $scripts['footer'] );
            }else{
                wp_enqueue_style( $keys, $scripts['src'], $scripts['dep'], PT_SCRIPT_VERSION, $scripts['footer'] );
            }
        }

        $vars = [];
        
        $vars['is_user_admin'] = current_user_can( 'administrator' );

        wp_localize_script( 'pt.js', 'PT_SETTING', $vars );
    }
}