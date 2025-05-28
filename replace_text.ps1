# PowerShell script to replace text in home-3-rtl.html
$content = Get-Content 'home-3-rtl.html' -Encoding UTF8
$oldText = '<span class="text-span-9">نحن </span>واحدة من بين 19 وكالة رياضية معتمدة من الاتحاد الدولي لكرة القدم (FIFA) في المملكة.<br>اعتمادنا الرسمي يجعلنا ضمن نخبة الوكالات المعترف بها عالميًا في إدارة مسيرة اللاعبين باحتراف.'
$newText = 'وكالة سبروتس فيجيني واحدة من بين 19 وكالة رياضية معتمدة من الاتحاد الدولي لكرة القدم (FIFA) في المملكة، مما يجعلنا رسميًا إحدى الوكالات المعترف بها عالميًا.'
$content = $content -replace [regex]::Escape($oldText), $newText
$content | Set-Content 'home-3-rtl.html' -Encoding UTF8 