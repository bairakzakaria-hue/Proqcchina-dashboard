<?php
/**
 * Plugin Name: ProQCChina Dashboard
 * Plugin URI: https://proqcchina.com
 * Description: Integrates the ProQCChina Dashboard React application with WordPress. Display the dashboard via shortcode or admin page.
 * Version: 1.0.0
 * Author: ProQCChina
 * Author URI: https://proqcchina.com
 * License: GPL v2 or later
 * Text Domain: proqcchina-dashboard
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Plugin constants
define('INSPACTION_DASHBOARD_VERSION', '1.0.0');
define('INSPACTION_DASHBOARD_URL', plugin_dir_url(__FILE__));
define('INSPACTION_DASHBOARD_PATH', plugin_dir_path(__FILE__));

/**
 * Register Custom Post Types
 */
function inspaction_register_post_types() {
    // Bookings
    register_post_type('inspaction_booking', array(
        'public' => false,
        'publicly_queryable' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'custom-fields'),
        'labels' => array(
            'name' => 'Bookings',
            'singular_name' => 'Booking',
            'add_new' => 'Add New Booking',
            'add_new_item' => 'Add New Booking',
            'edit_item' => 'Edit Booking',
            'new_item' => 'New Booking',
            'view_item' => 'View Booking',
            'search_items' => 'Search Bookings',
            'not_found' => 'No bookings found',
            'not_found_in_trash' => 'No bookings found in Trash'
        ),
        'menu_icon' => 'dashicons-calendar-alt',
        'capability_type' => 'post',
    ));

    // Invoices
    register_post_type('inspaction_invoice', array(
        'public' => false,
        'publicly_queryable' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'custom-fields'),
        'labels' => array(
            'name' => 'Invoices',
            'singular_name' => 'Invoice',
            'add_new' => 'Add New Invoice',
            'add_new_item' => 'Add New Invoice',
            'edit_item' => 'Edit Invoice',
            'new_item' => 'New Invoice',
            'view_item' => 'View Invoice',
            'search_items' => 'Search Invoices',
            'not_found' => 'No invoices found',
            'not_found_in_trash' => 'No invoices found in Trash'
        ),
        'menu_icon' => 'dashicons-media-spreadsheet',
        'capability_type' => 'post',
    ));

    // Reports
    register_post_type('inspaction_report', array(
        'public' => false,
        'publicly_queryable' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'custom-fields', 'thumbnail'),
        'labels' => array(
            'name' => 'Reports',
            'singular_name' => 'Report',
            'add_new' => 'Add New Report',
            'add_new_item' => 'Add New Report',
            'edit_item' => 'Edit Report',
            'new_item' => 'New Report',
            'view_item' => 'View Report',
            'search_items' => 'Search Reports',
            'not_found' => 'No reports found',
            'not_found_in_trash' => 'No reports found in Trash'
        ),
        'menu_icon' => 'dashicons-media-document',
        'capability_type' => 'post',
    ));
}
add_action('init', 'inspaction_register_post_types');

/**
 * Add meta boxes for custom fields
 */
function inspaction_add_meta_boxes() {
    add_meta_box(
        'booking_details',
        'Booking Details',
        'inspaction_booking_meta_box',
        'inspaction_booking',
        'normal',
        'high'
    );

    add_meta_box(
        'invoice_details',
        'Invoice Details',
        'inspaction_invoice_meta_box',
        'inspaction_invoice',
        'normal',
        'high'
    );

    add_meta_box(
        'report_details',
        'Report Details',
        'inspaction_report_meta_box',
        'inspaction_report',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'inspaction_add_meta_boxes');

/**
 * Booking meta box
 */
function inspaction_booking_meta_box($post) {
    wp_nonce_field('inspaction_save_meta', 'inspaction_meta_nonce');
    
    $service = get_post_meta($post->ID, '_booking_service', true);
    $status = get_post_meta($post->ID, '_booking_status', true);
    $date = get_post_meta($post->ID, '_booking_date', true);
    $amount = get_post_meta($post->ID, '_booking_amount', true);
    
    ?>
    <table class="form-table">
        <tr>
            <th><label for="booking_service">Service</label></th>
            <td>
                <select name="booking_service" id="booking_service" style="width: 100%;">
                    <option value="Company check-up" <?php selected($service, 'Company check-up'); ?>>Company check-up</option>
                    <option value="Factory audit" <?php selected($service, 'Factory audit'); ?>>Factory audit</option>
                    <option value="Pre-shipment inspection" <?php selected($service, 'Pre-shipment inspection'); ?>>Pre-shipment inspection</option>
                    <option value="During production inspection" <?php selected($service, 'During production inspection'); ?>>During production inspection</option>
                    <option value="Container loading supervision" <?php selected($service, 'Container loading supervision'); ?>>Container loading supervision</option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="booking_status">Status</label></th>
            <td>
                <select name="booking_status" id="booking_status" style="width: 100%;">
                    <option value="Processing" <?php selected($status, 'Processing'); ?>>Processing</option>
                    <option value="Completed" <?php selected($status, 'Completed'); ?>>Completed</option>
                    <option value="Unquoted" <?php selected($status, 'Unquoted'); ?>>Unquoted</option>
                    <option value="Unpaid" <?php selected($status, 'Unpaid'); ?>>Unpaid</option>
                    <option value="Draft" <?php selected($status, 'Draft'); ?>>Draft</option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="booking_date">Date</label></th>
            <td><input type="date" name="booking_date" id="booking_date" value="<?php echo esc_attr($date); ?>" style="width: 100%;" /></td>
        </tr>
        <tr>
            <th><label for="booking_amount">Amount</label></th>
            <td><input type="text" name="booking_amount" id="booking_amount" value="<?php echo esc_attr($amount); ?>" style="width: 100%;" placeholder="e.g., 500$" /></td>
        </tr>
    </table>
    <?php
}

/**
 * Invoice meta box
 */
function inspaction_invoice_meta_box($post) {
    wp_nonce_field('inspaction_save_meta', 'inspaction_meta_nonce');
    
    $due_date = get_post_meta($post->ID, '_invoice_due_date', true);
    $amount = get_post_meta($post->ID, '_invoice_amount', true);
    $status = get_post_meta($post->ID, '_invoice_status', true);
    
    ?>
    <table class="form-table">
        <tr>
            <th><label for="invoice_due_date">Due Date</label></th>
            <td><input type="date" name="invoice_due_date" id="invoice_due_date" value="<?php echo esc_attr($due_date); ?>" style="width: 100%;" /></td>
        </tr>
        <tr>
            <th><label for="invoice_amount">Amount</label></th>
            <td><input type="text" name="invoice_amount" id="invoice_amount" value="<?php echo esc_attr($amount); ?>" style="width: 100%;" placeholder="e.g., 500$" /></td>
        </tr>
        <tr>
            <th><label for="invoice_status">Status</label></th>
            <td>
                <select name="invoice_status" id="invoice_status" style="width: 100%;">
                    <option value="Paid" <?php selected($status, 'Paid'); ?>>Paid</option>
                    <option value="Unpaid" <?php selected($status, 'Unpaid'); ?>>Unpaid</option>
                </select>
            </td>
        </tr>
    </table>
    <?php
}

/**
 * Report meta box
 */
function inspaction_report_meta_box($post) {
    wp_nonce_field('inspaction_save_meta', 'inspaction_meta_nonce');
    
    $service = get_post_meta($post->ID, '_report_service', true);
    $factory = get_post_meta($post->ID, '_report_factory', true);
    $location = get_post_meta($post->ID, '_report_location', true);
    $delivered = get_post_meta($post->ID, '_report_delivered', true);
    $payment_status = get_post_meta($post->ID, '_report_payment_status', true);
    
    ?>
    <table class="form-table">
        <tr>
            <th><label for="report_service">Service Type</label></th>
            <td>
                <select name="report_service" id="report_service" style="width: 100%;">
                    <option value="PSI" <?php selected($service, 'PSI'); ?>>Pre-Shipment Inspection (PSI)</option>
                    <option value="DUPRO" <?php selected($service, 'DUPRO'); ?>>During Production Check (DUPRO)</option>
                    <option value="IPC" <?php selected($service, 'IPC'); ?>>Initial Production Check (IPC)</option>
                    <option value="FA" <?php selected($service, 'FA'); ?>>Factory Audit (FA)</option>
                    <option value="CLS" <?php selected($service, 'CLS'); ?>>Container Loading Supervision (CLS)</option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="report_factory">Factory</label></th>
            <td><input type="text" name="report_factory" id="report_factory" value="<?php echo esc_attr($factory); ?>" style="width: 100%;" /></td>
        </tr>
        <tr>
            <th><label for="report_location">Location</label></th>
            <td><input type="text" name="report_location" id="report_location" value="<?php echo esc_attr($location); ?>" style="width: 100%;" /></td>
        </tr>
        <tr>
            <th><label for="report_delivered">Completed</label></th>
            <td>
                <input type="checkbox" name="report_delivered" id="report_delivered" value="1" <?php checked($delivered, '1'); ?> />
                <label for="report_delivered">Report is completed</label>
            </td>
        </tr>
        <tr>
            <th><label for="report_payment_status">Payment Status</label></th>
            <td>
                <select name="report_payment_status" id="report_payment_status" style="width: 100%;">
                    <option value="Paid" <?php selected($payment_status, 'Paid'); ?>>Paid</option>
                    <option value="Pending" <?php selected($payment_status, 'Pending'); ?>>Pending</option>
                    <option value="Due" <?php selected($payment_status, 'Due'); ?>>Due</option>
                </select>
            </td>
        </tr>
    </table>
    <?php
}

/**
 * Save meta box data
 */
function inspaction_save_meta($post_id) {
    if (!isset($_POST['inspaction_meta_nonce']) || !wp_verify_nonce($_POST['inspaction_meta_nonce'], 'inspaction_save_meta')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $post_type = get_post_type($post_id);
    
    if ($post_type === 'inspaction_booking') {
        if (isset($_POST['booking_service'])) {
            update_post_meta($post_id, '_booking_service', sanitize_text_field($_POST['booking_service']));
        }
        if (isset($_POST['booking_status'])) {
            update_post_meta($post_id, '_booking_status', sanitize_text_field($_POST['booking_status']));
        }
        if (isset($_POST['booking_date'])) {
            update_post_meta($post_id, '_booking_date', sanitize_text_field($_POST['booking_date']));
        }
        if (isset($_POST['booking_amount'])) {
            update_post_meta($post_id, '_booking_amount', sanitize_text_field($_POST['booking_amount']));
        }
    }

    if ($post_type === 'inspaction_invoice') {
        if (isset($_POST['invoice_due_date'])) {
            update_post_meta($post_id, '_invoice_due_date', sanitize_text_field($_POST['invoice_due_date']));
        }
        if (isset($_POST['invoice_amount'])) {
            update_post_meta($post_id, '_invoice_amount', sanitize_text_field($_POST['invoice_amount']));
        }
        if (isset($_POST['invoice_status'])) {
            update_post_meta($post_id, '_invoice_status', sanitize_text_field($_POST['invoice_status']));
        }
    }

    if ($post_type === 'inspaction_report') {
        if (isset($_POST['report_service'])) {
            update_post_meta($post_id, '_report_service', sanitize_text_field($_POST['report_service']));
        }
        if (isset($_POST['report_factory'])) {
            update_post_meta($post_id, '_report_factory', sanitize_text_field($_POST['report_factory']));
        }
        if (isset($_POST['report_location'])) {
            update_post_meta($post_id, '_report_location', sanitize_text_field($_POST['report_location']));
        }
        update_post_meta($post_id, '_report_delivered', isset($_POST['report_delivered']) ? '1' : '0');
        if (isset($_POST['report_payment_status'])) {
            update_post_meta($post_id, '_report_payment_status', sanitize_text_field($_POST['report_payment_status']));
        }
    }
}
add_action('save_post', 'inspaction_save_meta');

/**
 * Dashboard Shortcode
 * Usage: [inspaction_dashboard page="overview"]
 */
function inspaction_dashboard_shortcode($atts) {
    $atts = shortcode_atts(array(
        'page' => 'overview',
        'height' => '800px',
        'lang' => ''
    ), $atts);

    // Get the Next.js app URL from options
    $dashboard_url = get_option('inspaction_dashboard_url', 'https://your-nextjs-app.vercel.app');
    
    // Detect WordPress language
    $wp_lang = '';
    if (!empty($atts['lang'])) {
        $wp_lang = $atts['lang'];
    } else {
        // Try to get from WordPress locale
        $locale = get_locale();
        // Map WordPress locales to our language codes
        $lang_map = array(
            'ar' => 'ar',
            'ar_SA' => 'ar',
            'fr_FR' => 'fr',
            'fr' => 'fr',
            'ru_RU' => 'ru',
            'ru' => 'ru',
            'en_US' => 'en',
            'en' => 'en',
        );
        $wp_lang = isset($lang_map[$locale]) ? $lang_map[$locale] : 'en';
    }
    
    $iframe_url = esc_url($dashboard_url . '?embed=true&page=' . $atts['page'] . '&lang=' . $wp_lang);
    
    return '<div class="inspaction-dashboard-container" style="width: 100%; height: ' . esc_attr($atts['height']) . '; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
        <iframe 
            src="' . $iframe_url . '" 
            width="100%" 
            height="100%" 
            frameborder="0"
            style="border: none;"
            allow="clipboard-read; clipboard-write">
        </iframe>
    </div>';
}
add_shortcode('inspaction_dashboard', 'inspaction_dashboard_shortcode');

/**
 * Admin menu
 */
function inspaction_dashboard_menu() {
    add_menu_page(
        'ProQCChina Dashboard',
        'ProQCChina',
        'manage_options',
        'inspaction-dashboard',
        'inspaction_dashboard_admin_page',
        'dashicons-chart-line',
        30
    );

    add_submenu_page(
        'inspaction-dashboard',
        'Dashboard Settings',
        'Settings',
        'manage_options',
        'inspaction-dashboard-settings',
        'inspaction_dashboard_settings_page'
    );
}
add_action('admin_menu', 'inspaction_dashboard_menu');

/**
 * Admin dashboard page
 */
function inspaction_dashboard_admin_page() {
    ?>
    <div class="wrap">
        <h1>ProQCChina Dashboard</h1>
        <?php echo do_shortcode('[inspaction_dashboard page="overview" height="900px"]'); ?>
    </div>
    <?php
}

/**
 * Settings page
 */
function inspaction_dashboard_settings_page() {
    if (isset($_POST['inspaction_save_settings'])) {
        check_admin_referer('inspaction_settings');
        
        update_option('inspaction_dashboard_url', sanitize_text_field($_POST['dashboard_url']));
        update_option('inspaction_api_enabled', isset($_POST['api_enabled']) ? '1' : '0');
        
        echo '<div class="notice notice-success"><p>Settings saved!</p></div>';
    }

    $dashboard_url = get_option('inspaction_dashboard_url', '');
    $api_enabled = get_option('inspaction_api_enabled', '0');
    ?>
    <div class="wrap">
        <h1>ProQCChina Dashboard Settings</h1>
        <form method="post" action="">
            <?php wp_nonce_field('inspaction_settings'); ?>
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="dashboard_url">Next.js Dashboard URL</label>
                    </th>
                    <td>
                        <input type="url" name="dashboard_url" id="dashboard_url" value="<?php echo esc_attr($dashboard_url); ?>" class="regular-text" placeholder="https://your-app.vercel.app" />
                        <p class="description">The URL where your Next.js dashboard is deployed.</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="api_enabled">Enable REST API Integration</label>
                    </th>
                    <td>
                        <input type="checkbox" name="api_enabled" id="api_enabled" value="1" <?php checked($api_enabled, '1'); ?> />
                        <label for="api_enabled">Allow Next.js app to fetch data from WordPress REST API</label>
                    </td>
                </tr>
            </table>
            <?php submit_button('Save Settings', 'primary', 'inspaction_save_settings'); ?>
        </form>

        <hr>

        <h2>Shortcode Usage</h2>
        <p>Use the following shortcode to embed the dashboard in any page or post:</p>
        <code>[inspaction_dashboard]</code>
        <p>With options:</p>
        <code>[inspaction_dashboard page="overview" height="800px"]</code>
        
        <h3>Available Pages:</h3>
        <ul>
            <li><code>page="overview"</code> - Overview dashboard</li>
            <li><code>page="bookings"</code> - Bookings page</li>
            <li><code>page="reports"</code> - Reports page</li>
            <li><code>page="invoices"</code> - Invoices page</li>
        </ul>
    </div>
    <?php
}

/**
 * Add REST API fields for custom post types
 */
function inspaction_register_rest_fields() {
    // Booking fields
    register_rest_field('inspaction_booking', 'booking_data', array(
        'get_callback' => function($post) {
            return array(
                'service' => get_post_meta($post['id'], '_booking_service', true),
                'status' => get_post_meta($post['id'], '_booking_status', true),
                'date' => get_post_meta($post['id'], '_booking_date', true),
                'amount' => get_post_meta($post['id'], '_booking_amount', true),
            );
        },
        'schema' => array(
            'type' => 'object',
            'context' => array('view', 'edit'),
        ),
    ));

    // Invoice fields
    register_rest_field('inspaction_invoice', 'invoice_data', array(
        'get_callback' => function($post) {
            return array(
                'due_date' => get_post_meta($post['id'], '_invoice_due_date', true),
                'amount' => get_post_meta($post['id'], '_invoice_amount', true),
                'status' => get_post_meta($post['id'], '_invoice_status', true),
            );
        },
        'schema' => array(
            'type' => 'object',
            'context' => array('view', 'edit'),
        ),
    ));

    // Report fields
    register_rest_field('inspaction_report', 'report_data', array(
        'get_callback' => function($post) {
            return array(
                'service' => get_post_meta($post['id'], '_report_service', true),
                'factory' => get_post_meta($post['id'], '_report_factory', true),
                'location' => get_post_meta($post['id'], '_report_location', true),
                'delivered' => get_post_meta($post['id'], '_report_delivered', true) === '1',
                'payment_status' => get_post_meta($post['id'], '_report_payment_status', true),
            );
        },
        'schema' => array(
            'type' => 'object',
            'context' => array('view', 'edit'),
        ),
    ));
}
add_action('rest_api_init', 'inspaction_register_rest_fields');

