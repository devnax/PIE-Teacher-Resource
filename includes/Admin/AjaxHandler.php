<?php


namespace DevNax\PIETeacher\Admin;
use DevNax\PIETeacher\Keys as Keys;



class AjaxHandler{


    static function init(){


        add_action('wp_ajax_pt_delete_dir', Keys::names("Admin\AjaxHandler::deleteDirectory") );
        add_action('wp_ajax_pt_get_dir', Keys::names("Admin\AjaxHandler::getDirectory") );
        add_action('wp_ajax_pt_create_folder', Keys::names("Admin\AjaxHandler::createFolder") );
    }


    static function createFolder(){
        if(!isset($_POST['name']) || !current_user_can('administrator')){
            return;
        }

        $name = $_POST['name'];
        $url  = $name;
        $path = $_POST['path'];
        $type = 'folder';
        $key  = "pt_$path";

        $f      = pathinfo($name);
        $isFile = strlen($f) > 0 ? true : false;

        if(isset($f['basename']) && isset($f['extension'])){
            
            $type = 'file';
            $name = $f['basename'];
        }

        $id = rand();

        $data = get_option( $key, true);
        if(is_array($data)){
            if(!in_array($name, $data)){
                $data[$id] = [
                    'id'    => $id,
                    'url'   => $url,
                    'name' => $name,
                    'type' => $type
                ];
                update_option( $key, $data );
            }
            
        }else{
            $data = array(
                $id => [
                    'id'    => $id,
                    'url'   => $url,
                    'name' => $name,
                    'type' => $type
                ]
            );
            add_option( $key, $data);
        }

        
        echo wp_send_json( $data );
        die;
    }

    static function getDirectory(){
        if(!isset($_POST['path'])){
            return;
        }

        $path = $_POST['path'];
        $key = "pt_$path";

        $data = get_option( $key, true);
        
        if(!is_array($data)){
            $data = [];
        }
        echo wp_send_json( $data );
        die;
    }

    static function deleteDirectory(){
        if(!isset($_POST['path']) || !current_user_can('administrator')){
            return;
        }

        $path = $_POST['path'];
        $item = $_POST['file'];
        $key = "pt_$path";

        $data = get_option( $key, true);
        if(is_array($data) && isset($data[$item])){
           unset($data[$item]);
           update_option( $key, $data );
        }
        echo wp_send_json( $data );
        die;
    }
}