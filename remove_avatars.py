import glob
import re

def remove_floating_avatars(html_content):
    # We are looking for the floating absolute block that contains the two unsplash face images.
    # It generally looks like:
    # <div class="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 ...
    #   <img src="...unsplash...facepad..."
    #   ...
    #   Trusted Globally
    #   ...
    #   "Accofin made our India entry..."
    # </div>
    
    # Due to formatting variations, regex with DOTALL is best to find the container div that has these Unsplash links.
    # The parent div has specific absolute positioning classes.
    
    pattern = re.compile(
        r'<div\s+class="absolute\s+-[a-z0-9-]+\s+-[a-z0-9-]+\s+bg-white[^>]*>.*?<img[^>]*unsplash\.com/photo-1507003211169.*?Trusted Globally.*?</div>',
        re.DOTALL | re.IGNORECASE
    )
    
    # Replacement snippet from prompt:
    # <div class="trust-strip">
    #   <span class="trust-icon">✦</span>
    #   <span class="trust-text">Trusted by 500+ businesses across India & globally</span>
    # </div>
    
    replacement = '''<div class="absolute -bottom-6 -left-6 bg-white dark:bg-card-dark p-4 rounded-xl shadow-xl z-20 border border-gray-100 dark:border-gray-800 flex items-center gap-3">
                            <span class="text-accent-gold text-lg">✦</span>
                            <span class="text-xs font-semibold text-secondary dark:text-gray-300 tracking-wide">Trusted by 500+ businesses<br>across India & globally</span>
                        </div>'''
                        
    new_content = pattern.sub(replacement, html_content)
    return new_content

if __name__ == "__main__":
    count = 0
    for fn in glob.glob('*.html'):
        with open(fn, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = remove_floating_avatars(content)
        
        if new_content != content:
            with open(fn, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Replaced avatar strip in {fn}")
            count += 1
            
    if count == 0:
        print("No avatar strips found matching pattern.")
    else:
        print(f"Processed {count} files.")
