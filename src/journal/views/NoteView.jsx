import { SaveOutlined, UploadFileOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks";
import { useMemo, useEffect, useRef } from "react";
import { setActiveNote, startSaveNote, startUploadingFiles } from "../../store";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {
  const dispatch = useDispatch()

  const { active: note, messageSaved, isSaving } = useSelector((state) => state.journal);
  const { body, title, date, imageUrls, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date( date )
    return newDate.toUTCString()
  },[date])

  const fieldInputRef = useRef()

   useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota Actualizada', messageSaved, "success")
    }
  }, [messageSaved])
  

  const onSaveNote = () => {
    dispatch( startSaveNote() )
  }

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return
    console.log('subiendo archivos')
    dispatch ( startUploadingFiles( target.files ) )
  }
  

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
      className="animate__animated animate__fadeIn animate__slow"
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          { dateString }
        </Typography>
      </Grid>
      <Grid item>

      <input 
        type='file'
        multiple
        ref={ fieldInputRef }
        onChange={(e) => onFileInputChange(e)}
        style={{ display: 'none'}}
      />

      <IconButton
        color="primary"
        disabled= { isSaving }
        onClick={() => fieldInputRef.current.click()}
      >
        <UploadFileOutlined />
      </IconButton>

        <Button disabled={ isSaving } onClick={onSaveNote} color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      {/* Image gallery */}
      <ImageGallery imageUrls={ imageUrls} />
    </Grid>
  );
};
