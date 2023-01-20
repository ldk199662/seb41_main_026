package back.domain.sleep.entity;

import back.domain.course.entity.Course;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@ToString
@Entity
@NoArgsConstructor
public class Sleep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sleepId;

    @Column(nullable = false)
    @Setter
    private String name;

    @Column(nullable = false)
    @Setter
    private String lat;

    @Column(nullable = false)
    @Setter
    private String lng;

    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    @Setter
    @JsonIgnore
    private Course course;

    public void addCourse(Course course) {
        this.course = course;
        course.addSleep(this);
    }
}
