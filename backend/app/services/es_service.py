import  clips
import tempfile


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
            if f.template.name=='patient':
                if(f["grave"]=="TRUE"):
                    result={"diagnostic":
                            {
                                "paludisme" : "confirme",
                                "Severite":"grave"
                            }
                            }
                elif(f["simple"]=="TRUE"):
                    result={"diagnostic":
                            {
                                "paludisme" : "confirme",
                                "Severite":"simple"
                            }
                            }
                else:
                    result={"diagnostic":
                            {
                                "paludisme" : "non confirme",
                            }
                            }
                    
        return result
    

    def get_treat(self):
        result={}
        for f in list(self.env.facts()):
             if f.template.name=='traitement':
                 result=f["medicament"]
                 
        return result
    

    
    def get_sugg(self):
        result={"suggestion": 
                            {
                                "suggestion": "pas de suggestion",
                            } 
                }
        
        return result

    
    
            
if __name__ == "__main__":

    id="vkhkhchckh"
    system=ExpertSystem(id)
    # system.add_symptom( "enceinte", "TRUE")
    system.add_symptom( "fievre", "TRUE")
    # system.add_symptom( "enceinte_trim", "2em")
    # system.add_symptom( "simple", "TRUE")
    # system.add_symptom( "derniers_localisation", "AntananarivoV d")
    system.add_symptom( "domicile", "Ambatoboeny")
    system.run()
    print(system.get_treat())

    # print(list(system.env.facts()))