
Notes on page validating
================================================================================

The tag `<keygen>` is "obsolete" according to the vildator.
Therefore we did not test it.

The input types `date`, `time`, and `color` 
(in the file `tags/interactive.html`)
are not supported in all browsers,
which triggers warnings in the validator.
However, the professor said we should keep the tests anyway.
Similarly, the `<bdi>` tag 
(in the file `tags/phrasing.html`)
triggers the same warning, too.

The tag `<math>` is the top-level element in MathML. 
MathML, however, is not supported by Chrome or Internet Explorer.