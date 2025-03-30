import  clips
import tempfile
import os

from models.case_model import Case
from schemas.case_schema import CaseToKnowledgeBase


class ExpertSystem:

    def __init__(self, id: str):
        self.env = clips.Environment()
        self.patient_id=id
        self.clear()
        self.setup_templates()
        self.load_rules()
        self.load_initial_facts()
        self.init_patient()

    def init_patient(self):
        self.env.assert_string(f"(patient (id \"{self.patient_id}\"))")
        self.env.assert_string(f"(diagnostique (id \"{self.patient_id}\"))")
        self.env.assert_string(f"(traitement (id \"{self.patient_id}\"))")


    def setup_templates(self):
        file_path = "/home/memoire/infra/v0/docker_malarIA/backend/app/clips/templates.clp"
        self.env.batch_star(file_path)

    def load_rules(self):
        file_path = "/home/memoire/infra/v0/docker_malarIA/backend/app/clips/rules.clp"
        self.env.batch_star(file_path)


    def load_initial_facts(self):
        file_path = "/home/memoire/infra/v0/docker_malarIA/backend/app/clips/initial_facts.clp"
        self.env.batch_star(file_path)


    def reset(self):
        self.env.reset()
        self.load_initial_facts()


    def clear(self):
        self.env.clear()

    def run(self):
        self.env.run()


    def add_symptom(self, symptom: str, value: str):
        temp= tempfile.NamedTemporaryFile( suffix='.clp')

        symptom_str=f"""
                    (defrule change
                        ?p <- (patient (id \"{self.patient_id}\"))
                        =>
                        (modify ?p ({symptom} {value}))
                    )
                    (run)
                    (undefrule change)
                    """

        with open(temp.name, 'w') as f:
            f.write(symptom_str)

        self.env.batch_star(temp.name)

        temp.close()


    def add_symptom_string(self, id: str, symptom: str, value: str):
        symptom_str=f"(patient (id \"{id}\")({symptom} {clips.Symbol(value)}))"

        self.env.assert_string(symptom_str)


    def add_symptom_temp(self, id: str, symptom: str, value: str):
        patient=self.env.find_template("patient")
        patient.assert_fact(id="3", name="aina")
    
    def get_diag(self):
        result={}
        for f in list(self.env.facts()):
            if f.template.name=='diagnostique' and f["id"]==self.patient_id:
                    result={"diagnostic":
                            {
                                "paludisme" : f["paludisme"],
                                "Severite":f["degre"]
                            }
                            }
                    
        return result
    

    def get_treat(self):
        result={}
        for f in list(self.env.facts()):
            if f.template.name=='traitement' and f["id"]==self.patient_id:
                result={"treatment":
                        {
                            "medicament": f["medicament"], 
                            "dose":"Voir posologie"
                        }
                       }
        return result
    
    @staticmethod
    def create_clp_rule(case: Case, data: CaseToKnowledgeBase):
        diag_line=['(id ?id)']
        treat_line=['(id ?id)']
        
        for i,j in data.diagnostic.items():
            diag_line.append(f"({clips.Symbol(i)} {clips.Symbol(j)})")
            
        # for l,m in data.traitement.items():
            # treat_line.append(f"({clips.Symbol(l)} {clips.Symbol(m)})")
        treat_line.append(f"jj")
            
        diag_str = "\t".join(diag_line)
        treat_str = "\t".join(treat_line)
        
        all_items = list(case.symptoms.items()) + list(case.analyses.items()) + list(case.patient_details.items())
        pattern_lines = ['(id ?id)']
        test_lines = []

        for k, v in all_items:
            var = f"?{clips.Symbol(k)}"
            pattern_lines.append(f"({clips.Symbol(k)} {clips.Symbol(var)})")
            test_lines.append(f'(test (eq {clips.Symbol(var)} {clips.Symbol(v)}))')

        pattern_str = "\n   ".join(pattern_lines)
        test_str = "\n   ".join(test_lines)

        clp_rule = f"""
                    (defrule {clips.Symbol(str(case.case_id))}
                    ?p <- (patient 
                                {pattern_str}
                            )
                    {test_str}
                    =>
                    (assert (diagnostic  {diag_str}))
                    ;; (assert (treatment  {treat_str}))
                    )
                    """
        rule_text=clp_rule.strip()
        
        # Define directory and filename
        dir_path = "/home/memoire/infra/v0/docker_malarIA/backend/app/clips/doctor_knowlesge_base"
        file_name = f"{str(case.case_id)}.clp"
        file_path = os.path.join(dir_path, file_name)

        # Create directory if it doesn't exist
        os.makedirs(dir_path, exist_ok=True)

        # Write rule to file
        with open(file_path, "w") as f:
            f.write(rule_text)

            
if __name__ == "__main__":

    id="vkhkhchckh"
    system=ExpertSystem(id)
    
    # system.add_symptom("id", "patient001")
    # system.add_symptom("age", "30")
    # system.add_symptom("derniers_localisation", "zone_rouge")
    # system.add_symptom("domicile", "Ambanja")
    # system.add_symptom("poids", "65")
    # system.add_symptom("sexe", "f")
    # system.add_symptom("allaitement", "TRUE")
    system.add_symptom("enceinte", "TRUE")
    system.add_symptom("enceinte_trim", "2em")
    # system.add_symptom("allergie", "penicilline pollen")
    # system.add_symptom("antecedents_medicaux", "diabete asthme")
    # system.add_symptom("type_de_sang", "A+")
    # system.add_symptom("tension", "TRUE")
    # system.add_symptom("diabete", "TRUE")

    # Symptômes simples
    system.add_symptom("fievre", "TRUE")
    # system.add_symptom("sueurs", "TRUE")
    # system.add_symptom("fatigue", "TRUE")
    system.add_symptom("frissons", "TRUE")
    system.add_symptom("sensation_de_froid", "TRUE")
    system.add_symptom("maux_de_tete", "TRUE")
    system.add_symptom("douleurs_musculaires", "TRUE")
    system.add_symptom("vomissements", "TRUE")
    system.add_symptom("diarrhees", "TRUE")
    system.add_symptom("toux", "TRUE")
    system.add_symptom("deshydratation", "TRUE")
    system.add_symptom("simple", "TRUE")

    # Symptômes graves
    # system.add_symptom("troubles_respiratoires_graves", "TRUE")
    system.add_symptom("defaillance_cardiaque", "TRUE")
    system.add_symptom("anemie_severe", "TRUE")
    system.add_symptom("hypoglycemie", "TRUE")
    system.add_symptom("hyperparasitemie", "TRUE")
    # system.add_symptom("acidose", "TRUE")
    # system.add_symptom("problemes_neurologiques", "TRUE")
    # system.add_symptom("hemorragie", "TRUE")
    # system.add_symptom("insuffisance_renale", "TRUE")
    # system.add_symptom("ictere", "TRUE")
    # system.add_symptom("grave", "TRUE")

    # Symptômes additionnels
    # system.add_symptom("fievre_48", "TRUE")
    # system.add_symptom("fievre_cyclique_48", "TRUE")
    # system.add_symptom("fievre_cyclique_72", "TRUE")

    # Analyses
    # system.add_symptom("TDR", "TRUE")
    # system.add_symptom("goutte_epais", "TRUE")
    # system.add_symptom("frotti_sanguin", "TRUE")
    # system.add_symptom("PCR", "TRUE")
    # system.add_symptom("HRP2", "TRUE")
    # system.add_symptom("HRP3", "TRUE")
    # system.add_symptom("pLDH", "TRUE")
    # system.add_symptom("analyse_parasitaire", "falciparum")
    # system.add_symptom("stade_parasitaire", "trophozoite")

        
    print("running")
    system.run()
    print(system.get_treat(), "\n", system.get_diag())
    print(list(system.env.facts()))
    
    # case={
    #         "symptoms": {
    #             "fievre": 'TRUE',
    #             "domicile": 'Ambatoboeny'
    #         },
    #         "analyses": {
    #             "TDR": "TRUE"
    #         },
    #         "patient_details": {
    #             "age": 15
    #         }
    #      }
    # print(case["symptoms"])
    # print(list(system.env.facts()))