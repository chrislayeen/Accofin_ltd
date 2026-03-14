const fs = require('fs');
const path = require('path');

// material_icon_name : lucide_icon_name
const iconMap = {
    "verified": "badge-check",
    "groups": "users",
    "fact_check": "clipboard-check",
    "receipt_long": "receipt",
    "account_balance": "landmark",
    "domain_add": "building-2",
    "analytics": "bar-chart-3",
    "security": "shield-check",
    "format_quote": "quote",
    "location_on": "map-pin",
    "public": "globe",
    "assured_workload": "briefcase",
    "local_police": "shield",
    "assignment_turned_in": "file-check-2",
    "verified_user": "user-check",
    "speed": "gauge",
    "trending_down": "trending-down",
    "warning": "alert-triangle",
    "check_circle": "check-circle-2",
    "arrow_forward": "arrow-right",
    "menu": "menu",
    "close": "x",
    "policy": "file-text",
    "admin_panel_settings": "shield-alert",
    "account_tree": "git-commit",
    "event_available": "calendar-check",
    "checklist": "list-checks",
    "shield": "shield",
    "settings_suggest": "settings",
    "visibility": "eye",
    "balance": "scale",
    "handshake": "handshake",
    "lock_person": "user-cog",
    "phone": "phone",
    "email": "mail",
    "chat": "message-circle",
    "expand_more": "chevron-down",
    "enhanced_encryption": "lock-keyhole",
    "map": "map",
    "domain": "building",
    "sync": "refresh-cw",
    "account_balance_wallet": "wallet",
    "travel_explore": "globe-2",
    "cloud_off": "cloud-off",
    "dns": "server",
    "vpn_key": "key",
    "gpp_maybe": "shield-alert",
    "calendar_month": "calendar",
    "precision_manufacturing": "factory",
    "dashboard": "layout-dashboard",
    "bar_chart": "bar-chart",
    "lock": "lock"
};

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace `<span class="...material-icons-outlined...">icon-name</span>`
    // using a regex with a replacer function
    const regex = /<span\s+class="([^"]*material-icons-outlined[^"]*)">([^<]+)<\/span>/g;

    content = content.replace(regex, (match, classes, iconText) => {
        let cleanIcon = iconText.trim();
        let lucideName = iconMap[cleanIcon];

        if (!lucideName) {
            console.log(`Warning: Unmapped icon "${cleanIcon}" in ${file}`);
            return match; // return original if not mapped
        }

        // Try to read the lucide SVG file
        const svgPath = path.join(__dirname, 'node_modules', 'lucide-static', 'icons', `${lucideName}.svg`);
        if (fs.existsSync(svgPath)) {
            let svgContent = fs.readFileSync(svgPath, 'utf8');
            let strippedClasses = classes.replace('material-icons-outlined', '').trim();
            if (!strippedClasses.includes('w-')) strippedClasses += ' w-6 h-6'; // Add size if missing

            // Add attributes to SVG
            svgContent = svgContent.replace('<svg', `<svg class="${strippedClasses}" aria-hidden="true"`);
            return svgContent;
        } else {
            console.log(`Warning: Missing SVG file for "${lucideName}" mapped from "${cleanIcon}"`);
            return match;
        }
    });

    // Remove the Material Icons Google font link
    content = content.replace(/<link[^>]+family=Material\+Icons\+Outlined[^>]+>\s*/g, '');

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Processed ${file}`);
});
