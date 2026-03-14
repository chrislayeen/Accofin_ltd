import os
import glob
import re

def style_ampersands(html_content):
    # Regex to find any h1-h6 tag or elements with specific badge classes
    # We want to replace ' & ' or '&amp;' with '<span class="amp">&amp;</span>' but only inside these tags.
    
    # We'll use a function to process the inner HTML of matched tags
    def replace_amp(match):
        full_tag = match.group(0)
        inner_content = match.group(2)
        
        # Don't replace if it's already wrapped in our span
        if '<span class="amp">' in inner_content:
            return full_tag
            
        # Replace standalone & or &amp; with the styled span
        new_inner = re.sub(r'(?<!<span class="amp">)\s*(?:&amp;|&)\s*(?!</span>)', ' <span class="amp">&amp;</span> ', inner_content)
        
        return full_tag.replace(inner_content, new_inner)

    # Match h1-h6 tags
    pattern_headers = re.compile(r'(<h[1-6][^>]*>)(.*?)(</h[1-6]>)', re.IGNORECASE | re.DOTALL)
    html_content = pattern_headers.sub(replace_amp, html_content)
    
    # Match specific badge spans (look for inlineflex uppercase tracking...)
    # This might be tricky with regex, simpler to just target headers first as requested
    
    return html_content

if __name__ == "__main__":
    html_files = glob.glob('*.html')
    
    for fn in html_files:
        with open(fn, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = style_ampersands(content)
        
        # Additional manual check for that specific Hero badge pill
        hero_badge_str = "India Regulatory & Transaction Support"
        if hero_badge_str in new_content:
            new_content = new_content.replace(hero_badge_str, 'India Regulatory <span class="amp">&amp;</span> Transaction Support')
            
        if new_content != content:
            with open(fn, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated ampersands in {fn}")
            
    print("Typography fixes applied.")
