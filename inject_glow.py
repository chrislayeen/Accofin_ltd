import os

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

keyframes = """
        <style>
            @keyframes pulse-slow-glow {
                0%, 100% {
                    opacity: 0.3;
                    transform: translate(-50%, -50%) scale(0.9);
                }
                50% {
                    opacity: 0.7;
                    transform: translate(-50%, -50%) scale(1.1);
                }
            }
            .animate-pulse-slow-glow {
                animation: pulse-slow-glow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
        </style>
"""

glow_div = """
            <div
                class="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-accent-gold/20 dark:bg-accent-gold/10 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse-slow-glow">
            </div>
"""

if 'pulse-slow-glow' not in text:
    text = text.replace('<!-- Hero Section -->', '<!-- Hero Section -->' + keyframes)
    text = text.replace('<!-- Soft Ambient Glows (Subtle) -->', '<!-- Soft Ambient Glows (Subtle) -->' + glow_div)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(text)
    print('Injected glow correctly.')
else:
    print('Glow already injected.')
