# ga-cnil-cookies
Adapation et amélioration du script d'intégration de google analytics fournis sur le site cnil.fr 
dans le cadre des recommandations de cet organisme, concernant l'utilisation des cookies. 


# Installer avec bower
```
bower install tetraedr/ga-cnil-cookies.git#master
``` 

# Usage 

```
<script type="text/javascript" src="<path-to-scripts>/ga-cnil-cookies.js"></script> 
<script type="text/javascript">
            cnilGA.start('XX-XXXXXXXX-X');// google analytics UA-ID
</script>
```

le fichier ```ga-cnil-cookies-default.css``` contient les styles par défaut des éléments créé par le script
libre à vous de le modifier selon vos besoins.

Script original : http://www.cnil.fr/vos-obligations/sites-web-cookies-et-autres-traceurs/outils-et-codes-sources/la-mesure-daudience/



