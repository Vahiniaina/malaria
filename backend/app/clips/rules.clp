
(defrule cas_simple
	(not (simple ?))
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
	(assert (simple ?simple))
	(modify ?patient (simple ?simple))
    (assert (diagnostique (id ?id)(paludisme confirme)(degre simple)))
)

(defrule cas_grave
	(not (grave ?))
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
                         (grave ?grave))
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
	(assert (grave ?grave))
	(modify ?patient (grave ?grave))
    (assert (diagnostique (id ?id)(paludisme confirme)(degre grave)))
)


(defrule cas_districal
    ; (declare (salience 100))
	(not (simple ?))
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
                    ; (derniers_localisation first$ ?local  )
                    ) 

    (localisation (district ?domicile) (classification ?classification_domicile))
    ; (localisation (district  ?local) (classification ?classification_localisations))
    
    (test (or (eq ?classification_domicile DNRS3) 
              (eq ?classification_domicile DNRS4)
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
	(assert (simple ?simple))
	(modify ?patient (simple ?simple))
    (assert (diagnostique (id ?id)(paludisme confirme)(degre simple)))
)


(defrule treat_simple
	(not (medicament ?) )
	?patient <- (patient (id ?id)(simple ?simple))
	(test (eq ?simple TRUE))
    =>
	(bind ?medicament "ACT artéméther + luméfantrine ou artésunate + amodiaquine ou artésunate + méfloquine ou artésunate + sulfadoxine-pyriméthamine ou dihydro-artémisinine_arténimol + pipéraquine"
)
	(assert (traitement (id ?id)(medicament ?medicament))))

(defrule treat_simple_enceinte_1trimestre
	(not (medicament ?) )
	?patient <- (patient (id ?id) (simple ?simple) (enceinte ?enceinte) (enceinte_trim ?enceinte_trim))
	(test (eq ?simple ?enceinte TRUE))
    (test (eq ?enceinte_trim 1))
    =>
	(bind ?medicament "quinine+clindamycine ou atovaquone-proguanil ")
    (bind ?duree "7 jour")
	(assert (traitement (id ?id)(medicament ?medicament) (duree ?duree))))


(defrule treat_simple_enceinte_2trimestre
	(not (medicament ?) )
	?patient <- (patient (id ?id)(simple ?simple) (enceinte ?enceinte) (enceinte_trim ?enceinte_trim))
	(test (eq ?simple ?enceinte TRUE))
    (test (neq ?enceinte_trim 1))
    =>
	(bind ?medicament "artéméther-luméfantrine "
)
	(assert (traitement (id ?id)(medicament ?medicament))))