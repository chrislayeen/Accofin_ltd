import glob
import re

def process_cta_italics(content, filepath):
    # This targets "Strategic Consultation" in contact.html
    # and any similar CTA headings.
    
    # 1. Contact.html known CTA: 
    # <span class="title-black">Request a<span class="text-primary italic"> </span><span class="title-blue">Strategic Consultation</span></span>
    if 'Request a' in content and 'Strategic Consultation' in content:
        # We need to wrap 'Strategic Consultation' in <em class="title-italic"> instead of just having it in a span, 
        # or we can modify the existing span to be an em. The prompt explicitly asked to wrap the italic portion in <em> with a class.
        
        # Current HTML: <span class="title-blue">Strategic Consultation</span>
        # Desired HTML (per prompt): "Wrap the italic portion in <em> with a CSS override" - so it inherits color but forces italics.
        
        # Let's replace the raw string if it exists in contact.html
        content = re.sub(
            r'<span class="title-blue">Strategic Consultation</span>', 
            r'<span class="title-blue"><em class="title-italic">Strategic Consultation</em></span>', 
            content
        )
        
    return content

if __name__ == "__main__":
    for fn in glob.glob('*.html'):
        with open(fn, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = process_cta_italics(content, fn)
        
        if new_content != content:
            with open(fn, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated italics in {fn}")
            
    print("Done.")
