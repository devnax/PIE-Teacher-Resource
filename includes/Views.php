<?php

namespace DevNax\PIETeacher;

class Views{
    static function get($name){
        $view_dir = PT_DIR."/views";
        if(is_file("{$view_dir}/{$name}.php")){
            return "{$view_dir}/{$name}.php";
        }
        return false;
    }

    static function load($name){
       $file = self::get($name);
       if($file){
            include $file;
       }
    }
}