package fr.doranco.pathMarket.controller;

import fr.doranco.pathMarket.model.dto.ProduitDto;
import fr.doranco.pathMarket.model.entity.Produit;
import fr.doranco.pathMarket.service.IProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/rest/produit")
public class ProduitController {
    @Autowired
     private IProduitService produitService;

    @PostMapping(
            value = "/create",
            consumes = "application/json",
            produces = "application/json")
    public Produit addProduit(@RequestBody Produit produit){
        try {
            produitService.addProduit(produit);
        } catch (Exception e) {
            e.printStackTrace();

        }
        return produit;
    }
@GetMapping("/search")
    public ResponseEntity<List<ProduitDto>> findTop10ByNomProduitStartingWithIgnoreCase(@RequestParam String prefixe){
        try {
            List<ProduitDto> produits= produitService.findTop10ByNomProduitStartingWithIgnoreCase(prefixe);
            return ResponseEntity.ok(produits);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

}
