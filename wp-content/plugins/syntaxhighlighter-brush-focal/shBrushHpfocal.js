/**
 * SyntaxHighlighter Hpfocal Brush
 * http://hdelossantos.com/
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/wiki/SyntaxHighlighter:Donate
 *
 * @version
 * 1.0.0 (May 20, 2010)
 * 
 * @copyright
 * Copyright (C) 2010 Hanly De Los Santos.
 *
 * @license
 * This file is a SyntaxHighlighter brush and is licensed under
 * the same license as SyntaxHighlighter.
 * 
 * SyntaxHighlighter is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * SyntaxHighlighter is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with SyntaxHighlighter.  If not, see <http://www.gnu.org/copyleft/lesser.html>.
 */
SyntaxHighlighter.brushes.Hpfocal = function() {
	//var keywords = 'XEQ GTO';
	var control = 'LBL END';
	//var test = 'testtest';

	this.regexList = [
		//{ regex: /([\t ^];).*/g,		css: 'comments' },
		{ regex: /^;.*/gm,		css: 'comments' },
		{ regex: /[\t ];.*/gm,		css: 'comments' },
		//{ regex: /^;.*/g,		css: 'comments' },
 { regex: SyntaxHighlighter.regexLib.doubleQuotedString,		css: 'string' },
		{ regex: SyntaxHighlighter.regexLib.singleQuotedString,		css: 'string' },
		//{ regex: /\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,			css: 'value' },
		//{ regex: /(?!\@interface\b)\@[\$\w]+\b/g,			css: 'color1' },
		//{ regex: /\@interface\b/g,					css: 'color2' },
		//{ regex: new RegExp(this.getKeywords(keywords), 'gm'),		css: 'color1' },
		//{ regex: new RegExp(this.getKeywords(test), 'gm'),		css: 'keyword' },
		{ regex: new RegExp(this.getKeywords(control), 'gm'),		css: 'color2' }
];

};

SyntaxHighlighter.brushes.Hpfocal.prototype = new SyntaxHighlighter.Highlighter();
SyntaxHighlighter.brushes.Hpfocal.aliases = ['hpfocal', 'hp41'];



