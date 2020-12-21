<?php

namespace DevNax\PIETeacher\Admin;
use DevNax\PIETeacher\Views as Views;
use DevNax\PIETeacher\Keys as Keys;

class Menu{
    private static $keys = null;

    static function init(){
        \add_action( 'admin_menu',  Keys::names("Admin\Menu::menu_init"));
    }


    static function menu_init(){

        $type = 'um_teacher';
        if(current_user_can( 'administrator')){
            $type = 'administrator';
        }

        \add_menu_page( 
            Keys::$names->admin_menu_title, 
            Keys::$names->admin_menu_title, 
            $type,
            Keys::$names->admin_menu_slug, 
            Keys::names('Admin\Menu::menu_page'), 
            Keys::$names->admin_menu_icon, 
            80 );
    }


    static function menu_page(){
        echo '<div id="pt-root"></div>';
    }

}