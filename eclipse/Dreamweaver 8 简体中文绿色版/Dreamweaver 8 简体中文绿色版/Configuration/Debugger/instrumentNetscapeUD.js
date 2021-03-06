
// Copyright 2000, 2001, 2002, 2003 Macromedia, Inc. All rights reserved.


//*************************GLOBALS**************************


var version = new String(navigator.platform);
var isMacintosh = (version.indexOf("Mac") >= 0 ? true : false);


//*************************API**************************


function getIncludeFiles()
{
   return new Array("MM_Debug.js", "MM_NSApplet.jar");
   //return new Array("MM_Debug.js", "MM_NSApplet.class");
}

function getStepInstrument(lineNumber, offset, isInFunction)
{
   return getIE4NetscapeStepInstrument(lineNumber, offset, isInFunction);
}

function getHeadInstrument()
{
   var strIndex = getMessageIndex();

   var str = "\n";

   str += "<script language=\"JavaScript1.2\" ID=\"Ex8\">\n";
   str += "<!--\n";
   str += "var MM_bArg;\n";
   str += "var MM_obj;\n";
   str += "var MM_evalRet;\n";
   str += "var MM_bInEval = false;\n";

   str += getIE4NetscapeHeadFunctions();

   str += getCommonHeadFunctions();

   str += "function MM_connectDbg()\n";
   str += "{\n";
   str += "   if ( MM_wasAlreadyLoaded() ) return;\n";
   str += "   var canceled = false;\n";
   str += "   if ( confirm(\""+MM.MSG_dbgStartDebugging[strIndex]+"\") ) {\n";
   str += "      while ( !document.MM_jsDebug || !document.MM_jsDebug.isLoaded )\n";
   str += "         if ( !confirm(\""+MM.MSG_dbgStartDebugging2[strIndex]+"\") )\n";
   str += "         {   canceled = true; break; }\n";
   str += "   } else { canceled = true; }\n";
   //       // exception occurs if user did not grant 
   //       // permission to the applet yet
   str += "   document.MM_jsDebug.connectDbg();\n";
   //       // in case the user granted permission and 
   //       // also clicked Cancel
   str += "   if ( canceled )\n";
   str += "      document.MM_jsDebug.disconnectDbg();\n";
   str += "}\n";

   str += "function MM_sendDbg(cmd)\n";
   str += "{\n";
   str += "   if ( document.MM_jsDebug )\n";
   str += "      return document.MM_jsDebug.sendDbg(cmd);\n";
   str += "   else\n";
   str += "      return 'continue';\n";
   str += "}\n";

   str += "function MM_disconnectDbg()\n";
   str += "{\n";
   str += "   if ( document.MM_jsDebug )\n";
   str += "      document.MM_jsDebug.disconnectDbg();\n";
   str += "}\n";

   str += "function MM_evalDbg(obj,str)\n";
   str += "{\n";
   str += "   MM_obj = obj;\n";
   str += "   if ( str.toString().length > 0 && document.MM_jsDebug )\n";
   str += "   {\n";
   //str += "      // the applet parameter must be an Object - can't be a \n";
   //str += "      // string literal - so we do new String\n";
   str += "      var toEval = new String('MM_doEvalFromApplet(\"'+MM_escQuotes(str)+'\");');\n";
   //str += "      //var toEval = new String(str);\n";
   str += "      MM_evalRet = null;\n";
   str += "      MM_bInEval = true;\n";
   str += "      var retval = document.MM_jsDebug.evalDbg(MM_obj, toEval);\n";
   str += "      MM_bInEval = false;\n";
   //str += "      // retval is meaningless (always null), the real return \n";
   //str += "      // value is set in MM_doEvalFromApplet - if an exception \n";
   //str += "      // is caught in the applet, then it will call MM_doEvalFromApplet \n";
   //str += "      // again with the string '[error]'\n";
   str += "      if ( MM_evalRet == null ) {\n";
   //str += "         // temporary alert message...we need to leave in this safety catch \n";
   //str += "         // so remove the assert\n";
   //str += "         alert('assert: MM_evalDbg: MM_evalRet should never be null');\n";
   str += "         MM_evalRet = MM_debugNull;\n";
   str += "      }\n";
   //str += "      else if ( MM_evalRet == MM_debugError ) {\n";
   //str += "         // temporary alert message...\n";
   //str += "         alert ('Dreamweaver debugger error evaluating:\\n'+str);\n";
   //str += "      }\n";
   str += "      return MM_evalRet;\n";
   str += "   }\n";
   str += "   else\n";
   str += "      return MM_debugError;\n";
   str += "}\n";
   str += "function MM_doEvalFromApplet(toEval)\n";
   str += "{\n";
   //str += "   alert('called MM_doEvalFromApplet: '+toEval);\n";
   str += "   with (MM_obj) return (MM_evalRet = eval(toEval));\n";
   str += "}\n";

   str += "//--"; // split to next line because can't have closing HTML comment tag
   str += ">\n";
   str += "</"; // split to next line because can't have closing HTML comment tag
   str += "script>\n";
   str += "<script language=\"JavaScript\" src=\"MM_Debug.js\"></"; // split to next line because can't have closing HTML comment tag
   str += "script>\n";
   
   return str;
}

function getBodyInstrument()
{
   var strIndex = getMessageIndex();

   var str = "\n";

   str += "<applet code=\"MM_NSApplet.class\" \n";
   str += "      width=\"2\" height=\"1\"\n";
   str += "      name=\"MM_jsDebug\"\n";
   str += "      archive=\"MM_NSApplet.jar\"\n";
   str += "      MAYSCRIPT>\n";
   str += "<p>\n";
   str += MM.MSG_dbgNoApplet[strIndex];
   str += "</p>\n";
   str += "</applet>\n";

   str += getCommonBodyInstrument();

   str += "<script language=\"JavaScript1.2\">\n";
   str += "<!--\n";
   str += "MM_connectDbg();\n";
   str += "//-"; // split to next line because can't have closing HTML comment tag
   str += "->\n";
   str += "</"; // split to next line because can't have closing HTML script tag
   str += "script>\n";

   return str;
}

