import os, glob

# 1. Update font URL
old_font = 'family=Playfair+Display:wght@400..900&family=Google+Sans+Flex:wght@300;400;500;600;700'
new_font = 'family=Lora:ital,wght@0,400..700;1,400..700&family=Google+Sans+Flex:wght@300;400;500;600;700'

# 2. Navbar Logo block
old_nav_logo = '''<div class="relative h-10 w-10 flex items-center justify-center">
                            <div class="absolute inset-0 border-2 border-secondary rounded-full"
                                style="clip-path: polygon(0 0, 100% 0, 100% 60%, 50% 100%, 0 60%);"></div>
                            <div class="absolute inset-0 border-2 border-primary rounded-full"
                                style="clip-path: polygon(0 60%, 50% 100%, 100% 60%, 100% 100%, 0 100%);"></div>
                            <span class="text-secondary font-sans text-xl font-bold z-10 -ml-1">A</span>
                            <span class="text-primary font-sans text-xl font-bold z-10 -ml-0.5">F</span>
                        </div>
                        <span
                            class="text-2xl font-bold text-secondary dark:text-white tracking-tight font-sans">Acco<span
                                class="text-primary">Fin</span> <span
                                class="text-gray-500 font-normal text-lg ml-1 hidden lg:inline">Consultancy</span></span>'''

new_nav_logo = '''<img src="logo.webp" alt="AccoFin Consultancy Logo" class="h-10 w-auto" />'''

# 3. Footer Logo block
old_footer_logo = '''<div class="flex items-center gap-3">
                            <div class="h-10 w-10 flex items-center justify-center bg-white rounded-full">
                                <span class="text-secondary font-sans text-xl font-bold">A</span>
                            </div>
                            <span class="text-2xl font-bold tracking-tight font-sans text-white">Acco<span
                                    class="text-primary">Fin</span></span>
                        </div>'''

new_footer_logo = '''<img src="logo.webp" alt="AccoFin Logo" class="h-12 w-auto brightness-0 invert" />'''

for fn in glob.glob('*.html'):
    with open(fn, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace(old_font, new_font)
    content = content.replace(old_nav_logo, new_nav_logo)
    content = content.replace(old_footer_logo, new_footer_logo)
    
    with open(fn, 'w', encoding='utf-8') as f:
        f.write(content)

# Update index.html specific 15+ -> 5+
with open('index.html', 'r', encoding='utf-8') as f:
    idx = f.read()

idx = idx.replace('15+\n                                Years Experience', '5+\n                                Years Experience')
idx = idx.replace('15+ Years Experience', '5+ Years Experience')
idx = idx.replace('>15+', '>5+')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(idx)

# Update tailwind.config.js
with open('public/tailwind.config.js', 'r', encoding='utf-8') as f:
    tc = f.read()
tc = tc.replace('Playfair Display', 'Lora')
with open('public/tailwind.config.js', 'w', encoding='utf-8') as f:
    f.write(tc)

print('Replacements done.')
