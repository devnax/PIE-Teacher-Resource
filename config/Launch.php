<?php
namespace DevNax\PIETeacher;
use DevNax\PIETeacher\Keys as Keys;

class Launch{
    
    static function run(){
       
        // load for admin
        if(is_admin()){
            call_user_func(Keys::$names->plugin_admin_init );
            return;
        }

        // fronend 
        call_user_func(Keys::$names->plugin_frontend_init);
    }
}