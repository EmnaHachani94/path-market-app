package fr.doranco.pathMarket.controller;



import fr.doranco.pathMarket.model.entity.Categorie;
import fr.doranco.pathMarket.service.ICategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/api/rest/categories")

public class CategorieController {
    @Autowired
    private ICategorieService categorieService;

    @PostMapping(
            value = "/create",
            consumes = "application/json",
            produces = "application/json")
    public void addCategorie(@RequestBody Categorie categorie){

        try {
            categorieService.addCategorie(categorie);
        } catch (Exception e) {
            e.printStackTrace();

        }
    }

}
