<?php


return [
        
    // Config Callbacks
    "plugin_action_link"        => "DevNax\PIETeacher\ActionLinks::links",
    "plugin_active"             => "DevNax\PIETeacher\Active::run",
    "plugin_deactive"           => "DevNax\PIETeacher\Deactive::run",
    "plugin_uninstall"          => "DevNax\PIETeacher\Uninstall::run",
    "plugin_launch"             => "DevNax\PIETeacher\Launch::run",
    "plugin_admin_init"         => "DevNax\PIETeacher\Admin::init",
    "plugin_frontend_init"      => "DevNax\PIETeacher\Frontend::init",

    // Admin Keys
    "admin_menu_title"          => "PIE Teacher",
    "admin_menu_slug"           => "pie-teacher",
    "admin_menu_icon"           => "dashicons-welcome-learn-more",


    // Admin Scripts
    "admin_scripts"         => [
        "pt.js" => [
            'src'       => PT_ASSETS_URI.'/js/admin.min.js',
            'footer'    => true,
            'dep'       => ['wp-element'],
            'for-page'  => "pie-teacher"
        ],
        "pt.css" => [
            'src'       => PT_ASSETS_URI.'/css/admin.min.css',
            'footer'    => false,
            'dep'       => [],
            'for-page'  => "pie-teacher"
        ],
    ],

    // Front Scripts
    "front_scripts"         => [
        "pt.js" => [
            'src'       => PT_ASSETS_URI.'/js/pt.front.min.js',
            'footer'    => true,
            'dep'       => []
        ],
        // "pt.css" => [
        //     'src'       => PT_ASSETS_URI.'/css/pt.front.min.css',
        //     'footer'    => false,
        //     'dep'       => []
        // ],
    ]
];