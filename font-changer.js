(function (Scratch) {
    'use strict';

    // A stylish font A-Z icon for the extension block matrix
    const fontIcon = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'><path d='M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.09-13h1.9l5.09 13h-2.09z'/></svg>";

    class Font_Changer_Mod {
        constructor() {
            this.currentFont = 'Arial';
            this.mainFont = 'Arial';
        }

        getInfo() {
            return {
                id: 'fontchangermod',
                name: 'Font Changer',
                color1: '#00bfff', // Clean Sky Blue theme
                color2: '#009acd',
                blockIconURI: fontIcon,
                menuIconURI: fontIcon,
                blocks: [
                    {
                        opcode: 'setFont',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set font to [FONT]',
                        arguments: {
                            FONT: {
                                type: Scratch.BlockType.STRING,
                                menu: 'fontMenu'
                            }
                        }
                    },
                    {
                        opcode: 'changeFont',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'change font to [FONT]',
                        arguments: {
                            FONT: {
                                type: Scratch.BlockType.STRING,
                                menu: 'fontMenu'
                            }
                        }
                    },
                    {
                        opcode: 'setMainFont',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'main font set to [FONT]',
                        arguments: {
                            FONT: {
                                type: Scratch.BlockType.STRING,
                                menu: 'fontMenu'
                            }
                        }
                    },
                    {
                        opcode: 'getCurrentFont',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'current font'
                    }
                ],
                menus: {
                    fontMenu: {
                        acceptReporters: true,
                        items: [
                            { text: 'Comic Sans', value: '"Comic Sans MS", "Comic Sans", cursive' },
                            { text: 'Pixel', value: '"Courier New", Courier, monospace' },
                            { text: 'Sans Serif', value: 'sans-serif' },
                            { text: 'Serif', value: 'serif' },
                            { text: 'Curly', value: '"Apple Chancery", "Zapf Chancery", spiral, romantic, cursive' }
                        ]
                    }
                }
            };
        }

        // Dynamically applies global CSS styling over the scratch runtime container canvas
        _applyGlobalFont(fontFamily) {
            let styleElement = document.getElementById('gandi-custom-font-style');
            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.id = 'gandi-custom-font-style';
                document.head.appendChild(styleElement);
            }
            // Overrides standard input text fields and bubble strings to your selected font family
            styleElement.textContent = `
                .stage_stage-overlay_32vrm, .scratch-input-box, text, input, textarea {
                    font-family: ${fontFamily} !important;
                }
            `;
        }

        setFont(args) {
            this.currentFont = args.FONT;
            this._applyGlobalFont(this.currentFont);
        }

        changeFont(args) {
            this.currentFont = args.FONT;
            this._applyGlobalFont(this.currentFont);
        }

        setMainFont(args) {
            this.mainFont = args.FONT;
            this.currentFont = args.FONT;
            this._applyGlobalFont(this.mainFont);
        }

        getCurrentFont() {
            // Returns a clean, friendly name for the reporter block
            if (this.currentFont.includes('Comic')) return 'Comic Sans';
            if (this.currentFont.includes('Courier')) return 'Pixel';
            if (this.currentFont.includes('sans-serif')) return 'Sans Serif';
            if (this.currentFont.includes('serif')) return 'Serif';
            if (this.currentFont.includes('Chancer')) return 'Curly';
            return this.currentFont;
        }
    }

    Scratch.extensions.register(new Font_Changer_Mod());
})(Scratch);
