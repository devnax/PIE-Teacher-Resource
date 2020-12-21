<?php

namespace DevNax\PIETeacher;


class ActionLinks{
    static function links($links){

        $links = array_merge( array(
            '<a href="' . esc_url( admin_url( '/admin.php?page=') ) . '">' . __( 'Settings', PT_TXTDOMAIN ) . '</a>'
        ), $links );

        return $links;
    }
}