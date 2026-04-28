package fr.doranco.pathMarket.model.dto;

public class ListeDeCoursesCreateResponseDto {
    private Long id;

    public ListeDeCoursesCreateResponseDto() {}

    public ListeDeCoursesCreateResponseDto(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
