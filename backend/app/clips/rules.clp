
(defrule cas_simple
    ; (declare (salience 23))
	?patient <- (patient 
                    (id ?id)
                    (fievre ?fievre) 
                    (sueurs ?sueurs) 
                    (fatigue ?fatigue) 
                    (frissons ?frissons) 
                    (sensation_de_froid ?sensation_de_froid) 
                    (maux_de_tete ?maux_de_tete) 
                    (douleurs_musculaires ?douleurs_musculaires) 
                    (vomissements ?vomissements) 
                    (diarrhees ?diarrhees) 
                    (toux ?toux) 
                    (deshydratation ?deshydratation) 
                    (simple ?simple))

    ?diagnostique <- (diagnostique (id ?id) (paludisme ?paludisme))
    (test (eq ?paludisme non_confirme))
	(test (eq 
            ?fievre 
            ?sueurs 
            ?fatigue 
            ?frissons 
            ?sensation_de_froid 
            ?maux_de_tete 
            ?douleurs_musculaires 
            ?vomissements 
            ?diarrhees 
            ?toux 
            ?deshydratation 
            TRUE))
    =>
	(bind ?simple TRUE)
	(modify ?patient (simple ?simple))
    (modify  ?diagnostique (paludisme confirme)(degre simple))
)

(defrule cas_grave
    ; (declare (salience 25))
	?patient <- (patient (id ?id)
                         (troubles_respiratoires_graves ?troubles_respiratoires_graves) 
                         (defaillance_cardiaque ?defaillance_cardiaque) 
                         (anemie_severe ?anemie_severe) 
                         (hypoglycemie ?hypoglycemie) 
                         (hyperparasitemie ?hyperparasitemie) 
                         (acidose ?acidose) 
                         (problemes_neurologiques ?problemes_neurologiques) 
                         (hemorragie ?hemorragie) 
                         (insuffisance_renale ?insuffisance_renale) 
                         (ictere ?ictere) 
                         (grave ?grave) 
                         (simple ?simple))
	
    ?diagnostique <- (diagnostique (id ?id) (paludisme ?paludisme) )
    (test (or (eq ?paludisme non_confirme) (eq ?simple TRUE)))
    (test (eq ?troubles_respiratoires_graves 
              ?defaillance_cardiaque 
              ?anemie_severe 
              ?hypoglycemie 
              ?hyperparasitemie 
              ?acidose 
              ?problemes_neurologiques 
              ?hemorragie 
              ?insuffisance_renale 
              ?ictere 
              TRUE))
    =>
	(bind ?grave TRUE)
	(modify ?patient (grave ?grave) (simple FALSE))
    (modify ?diagnostique (id ?id)(paludisme confirme)(degre grave))
)


(defrule cas_districal
    ; (declare (salience 22))
    ?patient <- (patient 
                    (id ?id)
                    (fievre ?fievre) 
                    (sueurs ?sueurs) 
                    (fatigue ?fatigue) 
                    (frissons ?frissons) 
                    (sensation_de_froid ?sensation_de_froid) 
                    (maux_de_tete ?maux_de_tete) 
                    (douleurs_musculaires ?douleurs_musculaires) 
                    (vomissements ?vomissements) 
                    (diarrhees ?diarrhees) 
                    (toux ?toux) 
                    (deshydratation ?deshydratation) 
                    (simple ?simple)
                    (domicile ?domicile)
                    (derniers_localisation ?local )
                    ) 

    ?do <- (localisation (district ?domicile) (classification ?classification_domicile))
    ; ?dl <- (localisation (district  ?local) (classification ?classification_localisations))
    
    ?diagnostique <- (diagnostique (id ?id)(paludisme ?paludisme))

    (test (eq ?paludisme non_confirme))

    (test (or 
              (eq ?classification_domicile DNRS3) 
              (eq ?classification_domicile DNRS4) 
            ;   (eq ?classification_localisations DNRS4) 
            ;   (eq ?classification_localisations DNRS4)
              ))
    (test (or 
       (neq ?fievre FALSE) 
       (neq ?sueurs FALSE) 
       (neq ?fatigue FALSE) 
       (neq ?frissons FALSE) 
       (neq ?sensation_de_froid FALSE) 
       (neq ?maux_de_tete FALSE) 
       (neq ?douleurs_musculaires FALSE) 
       (neq ?vomissements FALSE) 
       (neq ?diarrhees FALSE) 
       (neq ?toux FALSE) 
       (neq ?deshydratation FALSE)))
    =>
	(bind ?simple TRUE)
	(modify ?patient (simple ?simple))
    (modify ?diagnostique (id ?id)(paludisme confirme)(degre simple))
)


(defrule treat_simple
    ; (declare (salience 100))
	?diagnostique <- (diagnostique (id ?id)(degre ?degre))
    ?patient <- (patient (id ?id) (enceinte ?enceinte) (enceinte_trim ?enceinte_trim))
    ?traitement <- (traitement (id ?id))
    =>
	(bind ?medicament1 "ACT artéméther + luméfantrine ou artésunate + amodiaquine ou artésunate + méfloquine ou artésunate + sulfadoxine-pyriméthamine ou dihydro-artémisinine_arténimol + pipéraquine"
    )

	(bind ?medicament2 "quinine+clindamycine ou atovaquone-proguanil ")
    (bind ?duree2 "7 jours")

	(bind ?medicament3 "artéméther-luméfantrine  ")

    (if (and (eq ?enceinte TRUE) (eq ?enceinte_trim 1er) (eq ?degre simple))
        then 
	(modify ?traitement (id ?id)(medicament ?medicament2) (duree ?duree2))    
    )

    (if (and (eq ?enceinte TRUE) (neq ?enceinte_trim 1er) (eq ?degre simple))
        then 
	(modify ?traitement (id ?id)(medicament ?medicament3) )    
    )

    (if (and (eq ?enceinte FALSE)  (eq ?degre simple))
        then 
	(modify ?traitement (id ?id)(medicament ?medicament1) )    
    )
)


(defrule treat_grave
    ; (declare (salience -10000))
	?diagnostique <- (diagnostique (id ?id)(degre ?degre))
    ?traitement <- (traitement (id ?id))
	(test (eq ?degre grave))
    =>
	(bind ?medicament "Traitement grave")
	(modify ?traitement (id ?id)(medicament ?medicament))
    
)




; ;;;;;;;;;;;; Flou avec score

(defrule calculate-result-palu
    ; (declare (salience 24))
	?patient <- (patient 
        (id ?id)
        (enceinte ?enceinte)
		(fievre ?fievre)
		(sueurs ?sueurs)
		(fatigue ?fatigue)
		(frissons ?frissons)
		(sensation_de_froid ?sensation_de_froid)
		(maux_de_tete ?maux_de_tete)
		(douleurs_musculaires ?douleurs_musculaires)
		(vomissements ?vomissements)
		(diarrhees ?diarrhees)
		(toux ?toux)
		(deshydratation ?deshydratation)
		(simple ?simple)

		(troubles_respiratoires_graves ?troubles_respiratoires_graves)
		(defaillance_cardiaque ?defaillance_cardiaque)
		(anemie_severe ?anemie_severe)
		(hypoglycemie ?hypoglycemie)
		(hyperparasitemie ?hyperparasitemie)
		(acidose ?acidose)
		(problemes_neurologiques ?problemes_neurologiques)
		(hemorragie ?hemorragie)
		(insuffisance_renale ?insuffisance_renale)
		(ictere ?ictere)
		(grave ?grave)

		(fievre_48 ?fievre_48)
		(fievre_cyclique_48 ?fievre_cyclique_48)
		(fievre_cyclique_72 ?fievre_cyclique_72)
	)

    ?diagnostique <- (diagnostique (id ?id))
=>
	(bind ?palu 0)

	;;; Symptômes simples
	(if (eq ?fievre TRUE) then (bind ?palu (+ ?palu 1)))
	(if (eq ?sueurs TRUE) then (bind ?palu (+ ?palu 1)))
	(if (eq ?fatigue TRUE) then (bind ?palu (+ ?palu 1)))
	(if (eq ?frissons TRUE) then (bind ?palu (+ ?palu 1)))
	(if (eq ?sensation_de_froid TRUE) then (bind ?palu (+ ?palu 1)))
	(if (eq ?maux_de_tete TRUE) then (bind ?palu (+ ?palu 1)))
	(if (eq ?douleurs_musculaires TRUE) then (bind ?palu (+ ?palu 1)))
	(if (eq ?vomissements TRUE) then (bind ?palu (+ ?palu 1)))
	(if (eq ?diarrhees TRUE) then (bind ?palu (+ ?palu 1)))
	(if (eq ?toux TRUE) then (bind ?palu (+ ?palu 1)))
	(if (eq ?deshydratation TRUE) then (bind ?palu (+ ?palu 1)))

	;;; Symptômes graves
	(if (eq ?troubles_respiratoires_graves TRUE) then (bind ?palu (+ ?palu 2)))
	(if (eq ?defaillance_cardiaque TRUE) then (bind ?palu (+ ?palu 2)))
	(if (eq ?anemie_severe TRUE) then (bind ?palu (+ ?palu 2)))
	(if (eq ?hypoglycemie TRUE) then (bind ?palu (+ ?palu 2)))
	(if (eq ?hyperparasitemie TRUE) then (bind ?palu (+ ?palu 2)))
	(if (eq ?acidose TRUE) then (bind ?palu (+ ?palu 2)))
	(if (eq ?problemes_neurologiques TRUE) then (bind ?palu (+ ?palu 2)))
	(if (eq ?hemorragie TRUE) then (bind ?palu (+ ?palu 2)))
	(if (eq ?insuffisance_renale TRUE) then (bind ?palu (+ ?palu 2)))
	(if (eq ?ictere TRUE) then (bind ?palu (+ ?palu 2)))

	;;; Symptômes additionnels
	(if (eq ?fievre_48 TRUE) then (bind ?palu (+ ?palu 2)))
	(if (eq ?fievre_cyclique_48 TRUE) then (bind ?palu (+ ?palu 2)))
	(if (eq ?fievre_cyclique_72 TRUE) then (bind ?palu (+ ?palu 2)))

	;;; Calcul de probabilité (par exemple sur 25 max)
	(if (> ?palu 0) then
		(bind ?palu (/ ?palu 37))
	)
	
    
    ;;;;;    
    (if (>= ?palu 0.6) then 
        (bind ?simple TRUE)
	    (modify ?patient (simple ?simple))
        (modify ?diagnostique (id ?id) (paludisme confirme) (degre grave) (score ?palu))
    )
    (if (and (> ?palu 0.3) (< ?palu 0.6) ) then  
        (bind ?grave TRUE)
	    (modify ?patient (grave ?grave) (simple FALSE))
        (modify ?diagnostique (id ?id) (paludisme confirme) (degre simple) (score ?palu))
    )

)
