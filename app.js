var codeIn = document.getElementById("codeIn")                               ;
var codeOut = document.getElementById("codeOut")                             ;
var regexFormat = new RegExp(/^\s*((\}|;|\)).*)$/)                           ;
var regexPadding = new RegExp(/[\;|\{|\}][\}\{\;]*$/)                        ;

/*
  Most of the logic is written into this function. It would probably be
  more versitile if a string was sent to this funciton, and it returned
  a formatted string. 
*/
function cleanCode()                                                         {
  var maxLength = 4                                                          ;
  var codeInLines = codeIn.value.split('\n')                                 ;
  var formatted = ''                                                         ;
  var padded = ''                                                            ;

  //  This loop will find any lines that are just brackets and semicolons
  //  and it appends it to the previous lines. It also counts the maximum
  //  lenght of the lines to determine how much to pad
  for(i = 0; i < codeInLines.length; i++ )                                   {
    if(codeInLines[i].length > maxLength) maxLength = codeInLines[i].length  ;
    match = codeInLines[i].match(regexFormat)
    if(match)                                                                {
      formatted += match[1];} else                                           {
      if(i != 0) formatted += '\n'                                           ;
      formatted += codeInLines[i]                                            ;}}
  var formattedLines = formatted.split('\n')                                 ;

  // This loop pads the lines to the correct length.
  for(i = 0; i < formattedLines.length; i++)                                 {
    match = formattedLines[i].match(regexPadding)                            ;
    if(match)                                                                {
      var newLine = formattedLines[i].replace(regexPadding, '')              ;
      var paddedLine = rightPad(newLine, maxLength, ' ')                     ;
      padded += paddedLine + match[0] + '\n';} else                          {
      padded += formattedLines[i] + '\n'                                     ;}}
  codeOut.value = padded                                                     ;
  codeOut.select()                                                           ;}

// This is Matthew Hatcher's right pad function. Modified it to where it will
// Just add a space to single character lines
function rightPad (_string, _length, _char)                                  {
  if (typeof _string !== 'string')                                           {
    throw new Error('The string parameter must be a string.')                ;}
  if (_string.length < 1)                                                    {
    _string =+ ' '                                                           }
  if (typeof _length !== 'number')                                           {
    throw new Error('The length parameter must be a number.')                ;}
  if(typeof _char !== 'string' && _char)                                     {
    throw new Error('The character parameter must be a string.')             ;}

  var i = -1                                                                 ;
  _length = _length - _string.length                                         ;
  if (!_char && _char !== 0)                                                 {
    _char = ' '                                                              ;}
  while (++i < _length)                                                      {
    _string += _char                                                         ;}

  return _string                                                             ;}

document.getElementById("convert").onclick = cleanCode                       ;
