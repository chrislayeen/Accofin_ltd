import os, glob

for fn in glob.glob('*.html'):
    with open(fn, 'r', encoding='utf-8') as f:
        content = f.read()

    # Cache busting removal
    content = content.replace('?v=__SITE_VERSION__', '')
    content = content.replace('<script>const VERSION = "__SITE_VERSION__";</script>', '')
    
    # Location string consistency
    content = content.replace('Mumbai &amp; Bengaluru', 'Trivandrum, Kerala')
    content = content.replace('Mumbai & Bengaluru', 'Trivandrum, Kerala')

    if 'Headquartered in' not in content:
        # For the footer text we need exact matches
        content = content.replace('Trivandrum, Kerala', 'Headquartered in Trivandrum, Kerala &middot; Pan-India Services')

    # Footer links consistency
    content = content.replace('Compliance Updates</a>', 'Compliance Updates</a>')
    
    # Replace URLs
    content = content.replace('href="index.html#top" class="hover:text-primary transition">Compliance Updates', 'href="coming-soon.html" class="hover:text-primary transition">Compliance Updates')
    content = content.replace('href="#" class="hover:text-primary transition">Compliance Updates', 'href="coming-soon.html" class="hover:text-primary transition">Compliance Updates')

    content = content.replace('href="index.html#top" class="hover:text-primary transition">Sector Insights', 'href="coming-soon.html" class="hover:text-primary transition">Sector Insights')
    content = content.replace('href="#" class="hover:text-primary transition">Sector Insights', 'href="coming-soon.html" class="hover:text-primary transition">Sector Insights')

    content = content.replace('href="index.html#top" class="text-gray-500 hover:text-primary transition text-xs">Privacy\n                            Policy', 'href="privacy.html" class="text-gray-500 hover:text-primary transition text-xs">Privacy\n                            Policy')
    content = content.replace('href="index.html#top" class="text-gray-500 hover:text-primary transition text-xs">Terms of\n                            Service', 'href="terms.html" class="text-gray-500 hover:text-primary transition text-xs">Terms of\n                            Service')
    
    # Fallback to single line text
    content = content.replace('href="index.html#top" class="text-gray-500 hover:text-primary transition text-xs">Privacy Policy', 'href="privacy.html" class="text-gray-500 hover:text-primary transition text-xs">Privacy Policy')
    content = content.replace('href="index.html#top" class="text-gray-500 hover:text-primary transition text-xs">Terms of Service', 'href="terms.html" class="text-gray-500 hover:text-primary transition text-xs">Terms of Service')
    
    with open(fn, 'w', encoding='utf-8') as f:
        f.write(content)

print('Global text replacements completed.')
